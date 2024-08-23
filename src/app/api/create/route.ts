import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { Pinecone } from "@pinecone-database/pinecone";
import { db } from "../../../firebase.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "@clerk/nextjs/server";

const systemPrompt = `You are an assistant designed to help users find the most suitable clubs to join based on their personal interests, background, and academic goals. Users will fill out a form or quiz that provides details such as their interests, gender, religious and cultural preferences, hobbies, intended major, and graduation year. Using this information, you will generate embeddings and perform a similarity search using Pinecone to retrieve the top 3 clubs from the vector database.

Task Breakdown:

Form/Quiz Data Collection:
Collect detailed information from the user, including:
Interests: Types of clubs or activities they enjoy.
Gender: If it’s relevant to their club preferences.
Religious Interests: Any faith-based clubs or activities they might prefer.
Cultural Interests: Clubs that align with their cultural background or interests.
Hobbies: Specific hobbies that might match with club offerings.
Intended Major: Academic focus that could align with academic or professional clubs.
Graduation Year: To consider clubs that might have longer or shorter commitments based on their graduation timeline.

Structured Response:
Return the top 3 most relevant clubs in a structured JSON format based on the following schema:
Name: The club’s name.
Type: The category of the club (e.g., Technology, Arts, Sports).
Description: A brief summary of what the club is about.
Media: An array of social media and online presence links.
Instagram: Optional URL to the club's Instagram.
Facebook: Optional URL to the club's Facebook.
Website: Optional URL to the club's official website.
LinkedIn: Optional URL to the club's LinkedIn.
Linktree: Optional URL to a Linktree or similar resource.
Recommendation: A personalized explanation of why the user should consider joining this club, based on the alignment between their profile and the club’s profile.

Example JSON Response:
[
  {
    "name": "Tech Innovators Club",
    "type": "Technology",
    "description": "A community for students passionate about technology and innovation. We work on tech projects, attend hackathons, and host tech talks.",
    "media": [
      {
        "instagram": "https://www.instagram.com/techinnovators",
        "website": "https://www.techinnovatorsclub.com"
      }
    ],
    "recommendation": "Based on your interest in technology and your major in Computer Science, this club is a great match. The club's focus on innovation and tech projects aligns with your goals, and the events they host will help you gain practical experience."
  },
  {
    "name": "Outdoor Adventure Club",
    "type": "Recreation",
    "description": "A club for outdoor enthusiasts. We organize hiking trips, camping weekends, and other outdoor activities to explore nature.",
    "media": [
      {
        "facebook": "https://www.facebook.com/outdooradventureclub",
        "website": "https://www.outdooradventureclub.com"
      }
    ],
    "recommendation": "Given your love for nature and outdoor activities, the Outdoor Adventure Club is a perfect fit. Their hiking trips and camping events will provide you with the outdoor experiences you’re passionate about."
  },
  {
    "name": "Cultural Exchange Society",
    "type": "Culture",
    "description": "A club focused on cultural exchange and promoting diversity on campus. We host events that celebrate different cultures and traditions.",
    "media": [
      {
        "instagram": "https://www.instagram.com/culturalexchange",
        "facebook": "https://www.facebook.com/culturalexchange"
      }
    ],
    "recommendation": "Your interest in cultural diversity and your background make the Cultural Exchange Society a great choice. This club will allow you to connect with others who share your passion for cultural exchange and inclusivity."
  }
]

Response Generation:
Ensure the response is accurate, relevant, and reflects the user’s profile.
If no suitable clubs are found, suggest refining their input or exploring broader categories.

Tone and Style:
Maintain a friendly, informative, and helpful tone.
Provide clear and concise explanations in the recommendation to guide the user in making an informed choice.`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const pinecone = new Pinecone({
  apiKey: String(process.env.PINECONE_API_KEY),
});

const mediaSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  linktree: z.string().optional(),
});

const clubSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  media: z.array(mediaSchema),
  recommendation: z.string(),
});
const clubsSchema = z.object({
  clubs: z.array(clubSchema),
});

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  const userId = auth.userId;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { gender, clubType, religion, interests } = await req.json();

  const embeddingInput = `User Profile:
    Gender: ${gender}
    Club Type: ${clubType.join(", ")}
    Religion: ${religion.join(", ")}
    Interests: ${interests}`;

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: embeddingInput, // TODO: CHANGE WHEN FORM DETAILS ARE FINALIZED
    encoding_format: "float",
  });

  const index = pinecone.index("hunter-clubs");

  const results = await index.namespace("ns1").query({
    topK: 3,
    includeMetadata: true,
    vector: embeddings.data[0].embedding,
    // TODO: ADD METADATA FILTERS TO OPTIMIZE SIMILARITY SEARCH
    filter: {
      club_type: { $in: clubType },
    },
  });

  // return new NextResponse(JSON.stringify(results.matches));

  const inputString = `Based on the interests provided, here are some clubs that might be of interest:
  ${results.matches
    .map(
      (match, index) => `
  ${index + 1}. ${match.id}
  Type: ${match.metadata?.club_type}
  Description: ${match.metadata?.description}
  Media: ${
    Array.isArray(match.metadata?.media)
      ? match.metadata.media.join(", ")
      : "N/A"
  }
  `
    )
    .join("\n")}
  
  Please provide more details or recommendations based on these clubs.`;

  //const input = results.matches; // PROCESS DATA INTO READABLE STRING FOR OPENAI
  //return new NextResponse(JSON.stringify(input));
  //   const testInput =
  //     "What are some clubs similar to the Hunter College Computer Science Club?";
  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: inputString },
      ],
      response_format: zodResponseFormat(clubsSchema, "clubs"),
    });
    const clubs = completion.choices[0].message.parsed;

    console.log(clubs?.clubs);

    await addDoc(collection(db, "users"), {
      userId: userId,
      clubs: clubs?.clubs,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      message: "Reccomendations added successfully!",
    });
  } catch (error: Error | any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error.message }));
  }
}

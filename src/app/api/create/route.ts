import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { Pinecone } from "@pinecone-database/pinecone";

const systemPrompt = ``;

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
});
const clubsSchema = z.array(clubSchema);

export async function POST(req: NextRequest) {
  const data = await req.json();

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: data, // TODO: CHANGE WHEN FORM DETAILS ARE FINALIZED
    encoding_format: "float",
  });

  const index = pinecone.index("hunter-clubs");

  const results = await index.namespace("ns1").query({
    topK: 3,
    includeMetadata: true,
    vector: embeddings.data[0].embedding,
    // TODO: ADD METADATA FILTERS TO OPTIMIZE SIMILARITY SEARCH
  });

  const input = results; // PROCESS DATA INTO READABLE STRING FOR OPENAI
  const testInput =
    "What are some clubs similar to the Hunter College Computer Science Club?";

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: testInput },
    ],
    response_format: zodResponseFormat(clubsSchema, "clubs"),
  });
  const clubs = completion.choices[0].message.parsed;

  return new NextResponse(JSON.stringify(clubs));
}

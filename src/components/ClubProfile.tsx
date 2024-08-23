"use client"

import { db } from "@/firebase";
import { getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ClubProfileProps } from "./GenerateClubs";

export default function ClubProfile() {
    const [clubName, setClubName] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState<{ [key: string]: string }>({});
    const [allAttributes, setAllAttributes] = useState<ClubProfileProps | null>(null);

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const clubRef = collection(db, "clubs");

    const editClubProfile = async (clubName: string, description: string, media: { [key: string]: string }) => {
        const clubDocRef = doc(db, "clubs", clubName);
        await updateDoc(clubDocRef, {
            club_description: description,
            club_links: media,
        });
    }

    useEffect(() => {
        const getClubProfile = async () => {
            try {
                const querySnapshot = await getDocs(clubRef);
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as ClubProfileProps;
                    if (data.club_links.email === userEmail) {
                        setClubName(data.club_name);
                        setDescription(data.club_description);
                        setMedia(data.club_links);
                        setAllAttributes(data);
                    }
                });
            } catch (error) {
                console.error("Error fetching club profile: ", error);
            }
        };
        getClubProfile();
    }, [userEmail]);

    if (!allAttributes) {
        return <div>No matching club found for the signed-in user's email.</div>;
    }

    return (
        <div>
            <h1>Club Profile</h1>
            <h2>{clubName}</h2>
            <p>{description}</p>
            <ul>
                {Object.keys(media).map((key) => (
                    <li key={key}>
                        <a href={media[key]} target="_blank">
                            {key.charAt(0).toUpperCase() + key.slice(1)}: {media[key]}
                        </a>
                    </li>
                ))}
            </ul>
            <button onClick={() => editClubProfile(clubName, description, media)}>
                Update Club Info
            </button>
        </div>
    );
}

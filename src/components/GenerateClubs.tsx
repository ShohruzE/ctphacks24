"use client";

import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ClubProfileProps {
    club_name: string;
    club_description: string;
    club_links: { [key: string]: string };
    club_type: string;
}

export default function GenerateClubs() {
    const [clubs, setClubs] = useState<ClubProfileProps[]>([]);

    const clubRef = collection(db, "clubs");

    useEffect(() => {
        const getClubs = async () => {
            try {
                const querySnapshot = await getDocs(clubRef);
                const clubsData: ClubProfileProps[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const clubLinks = data.club_links || {};
                    clubsData.push({
                        ...data,
                        club_links: clubLinks,
                    } as ClubProfileProps);
                });

                setClubs(clubsData);
            } catch (error) {
                console.error("Error fetching clubs: ", error);
            }
        };
        getClubs();
    }, []);

    const mediaOrder = ["website", "instagram", "facebook", "linktree", "email"];

    const clubsByType = clubs.reduce((acc, club) => {
        if (!acc[club.club_type]) {
            acc[club.club_type] = [];
        }
        acc[club.club_type].push(club);
        return acc;
    }, {} as { [key: string]: ClubProfileProps[] });

    return (
        <div>
            <h1>Clubs</h1>
            {Object.keys(clubsByType).map((type) => (
                <div key={type}>
                    <h2>{type}</h2>
                    <div className="flex flex-row">
                        {clubsByType[type].map((club, index) => (
                            <div key={index} className="border-2 w-3/6 rounded-md">
                                <h1>{club.club_name}</h1>
                                <p>Club type: {club.club_type}</p>
                                <p>Description: {club.club_description}</p>
                                <ul>
                                    {mediaOrder.map((media) =>
                                        club.club_links[media] ? (
                                            <li key={media}>
                                                <a href={club.club_links[media]} target="_blank">
                                                    {media.charAt(0).toUpperCase() + media.slice(1)}: {club.club_links[media]}
                                                </a>
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export type { ClubProfileProps };

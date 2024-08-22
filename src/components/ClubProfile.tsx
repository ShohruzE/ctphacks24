"use client"

import { db } from "@/firebase";
import { getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ClubProfileProps {
    club_name: string;
    club_description: string;
    club_links: string[];
}

export default function ClubProfile() {
    const [clubName, setClubName] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState([""]);
    const [allAttributes, setAllAttributes] = useState({});

    const clubRef = collection(db, "clubs");

    const editClubProfile = async (clubName: string, description: string, media: string[]) => {
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
                    setClubName(doc.data().club_name);
                    setDescription(doc.data().club_description);
                    setMedia(doc.data().club_links);
                    setAllAttributes(doc.data());
                    console.log(doc.data());
                });
            } catch (error) {
                console.error("Error fetching club profile: ", error);
            }
        };
        getClubProfile();
    }, []);

    return (
        <div>
            <h1>Club Profile</h1>
            <div>
                <p>Club Name:</p>
                <p>{clubName}</p>
                {/* <label>
                    Club Name:
                    <input
                        type="text"
                        value={clubName}
                        onChange={(e) => setClubName(e.target.value)}
                    />
                </label> */}
            </div>
            <div>
                <p>Description:</p>
                <p>{description}</p>
                {/* <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label> */}
            </div>
            <div>
                <p>Media:</p>
            
            </div>
            <button onClick={() => editClubProfile(clubName, description, media)}>
                Update Club Info
            </button>
        </div>
    );
}

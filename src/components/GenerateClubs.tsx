"use client";

import { db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Globe, Mail, Instagram, Facebook } from "lucide-react";

const mediaIcons: { [key: string]: any } = {
  website: Globe,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook,
};

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

  const clubsByType = clubs.reduce((acc, club) => {
    if (!acc[club.club_type]) {
      acc[club.club_type] = [];
    }
    acc[club.club_type].push(club);
    return acc;
  }, {} as { [key: string]: ClubProfileProps[] });

  return (
    <div className="flex flex-col justify-center items-center">
      {Object.keys(clubsByType).map((type) => (
        <div key={type} className="py-16">
          <div className="flex flex-row flex-wrap justify-center gap-8">
            {clubsByType[type].map((club, index) => (
              <Card
                key={index}
                className="flex flex-col border-2 border-purple-800 w-[350px] rounded-xl"
              >
                <CardHeader>
                  <CardTitle className="font-bold">{club.club_name}</CardTitle>
                  <h4 className="font-semibold text-slate-500">
                    {club.club_type}
                  </h4>
                </CardHeader>
                <CardContent className="grow">
                  <CardDescription>{club.club_description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-row flex-wrap items-center gap-2">
                  {Object.keys(mediaIcons).map((media) => {
                    const Icon = mediaIcons[media];
                    return (
                      club.club_links[media] && (
                        <Link
                          key={media}
                          href={club.club_links[media]}
                          target="_blank"
                          className="hover:text-purple-800"
                        >
                          <Icon size={30} />
                        </Link>
                      )
                    );
                  })}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

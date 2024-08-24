"use client";

import { db } from "@/firebase";
import {
  getDoc,
  getDocs,
  doc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Globe, Mail, Instagram, Facebook } from "lucide-react";

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface MediaLinks {
  [key: string]: string | undefined;
  instagram?: string;
  facebook?: string;
  email?: string;
  website?: string;
}

interface ClubProfile {
  club_name: string;
  club_description: string;
  club_type: string;
  club_links: MediaLinks;
}

const mediaIcons: { [key: string]: any } = {
  website: Globe,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook,
};

export default function ClubProfile() {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([""]);
  const [allAttributes, setAllAttributes] = useState({});
  const [club, setClub] = useState<ClubProfile>();

  const { clubId }: { clubId: string } = useParams();

  const clubRef = collection(db, "clubs");

  const editClubProfile = async (
    clubName: string,
    description: string,
    media: string[]
  ) => {
    const clubDocRef = doc(db, "clubs", clubName);
    await updateDoc(clubDocRef, {
      club_description: description,
      club_links: media,
    });
  };

  //   useEffect(() => {
  //     const getClubProfile = async () => {
  //       try {
  //         const querySnapshot = await getDocs(clubRef);
  //         querySnapshot.forEach((doc) => {
  //           //   setClubName(doc.data().club_name);
  //           //   setDescription(doc.data().club_description);
  //           //   setMedia(doc.data().club_links);
  //           //   setAllAttributes(doc.data());
  //           console.log(doc.data());
  //         });
  //       } catch (error) {
  //         console.error("Error fetching club profile: ", error);
  //       }
  //     };
  //     getClubProfile();
  //   }, []);

  useEffect(() => {
    const getClubProfile = async () => {
      if (!clubId) return; // Wait for clubId to be available
      try {
        const docRef = doc(db, "clubs", clubId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as ClubProfile;
          setClub(data);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching club profile: ", error);
      }
    };
    getClubProfile();
  }, [clubId]);

  return (
    <div>
      <Card className="flex flex-col border-2 border-purple-800 w-[500px] rounded-xl">
        <CardHeader>
          <CardTitle className="font-bold">{club?.club_name}</CardTitle>
          <h4 className="font-semibold text-slate-500">{club?.club_type}</h4>
        </CardHeader>
        <CardContent className="grow">
          <CardDescription className="text-md">
            {club?.club_description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row flex-wrap items-center gap-2">
          {Object.keys(mediaIcons).map((media) => {
            const Icon = mediaIcons[media];
            return (
              club?.club_links[media] && (
                <Link
                  key={media}
                  href={club?.club_links[media]}
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
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
interface club {
  description: string;
  media: string[];
  club_name: string;
  recommendation: string;
  type: string;
}
interface UserProfileProps {
  id: string;
  major: string;
  academic_year: number;
  clubs: club[];
  recommendation: club[];
}

export default function UserProfile() {
  const { userId } = useAuth();
  const [clubs, setClubs] = useState<
    { name: string; recommendation: string }[]
  >([]); const getClubs = async () => {
    try {
      const docRef = doc(db, "users", userId);
      console.log("Document Reference:", docRef);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const clubsData = docSnap.data().clubs;
        setClubs(clubsData);
        console.log("Clubs Data:", clubsData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };
  // Log clubs whenever it updates
  useEffect(() => {
    console.log("Updated Clubs State:", clubs);
  }, [clubs]);

  // Call getClubs inside useEffect
  useEffect(() => {
    if (userId) {
      getClubs();
    }
  }, [userId]);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full gap-6 p-6">
      <div className="flex flex-col gap-4 bg-[#e2e8f0] rounded-3xl rounded-b-3xl min-h-max p-4 m-20 ">
        <span className="text-2xl font-semibold text-center">
          Club Recommendations
        </span>
        {clubs.map((club, index) => {
          return (
            <Card key={index} className="h-full overflow-scroll scrollbar-hide bg-[#e2e8f0] border-t-indigo-500">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-6 h-full">
                <span className="text-2xl font-semibold text-center">
                  {club.name}
                </span>
                <div className="">
                  <p className="text-center ">
                    {club.recommendation}
                  </p>
                </div>
                <Link
                  className="hover:text-slate-400 font-bold"
                  href="/clubDirectory"
                >
                  <Button type="submit" className="mt-auto">
                    Click here for more information
                  </Button>
                </Link>

              </CardContent>
            </Card>)
        })}
      </div>
      <div className="flex flex-col gap-4 m-20">
        <div className="flex flex-col gap-4 bg-[#e2e8f0] rounded-3xl rounded-b-3xl min-h-max p-4 grow justify-center">
          <span className="text-2xl font-semibold text-center">
            Club Events
          </span>
          <Calendar className="self-center" />
        </div>

      </div>
    </div>
    // const [id, setId] = useState("");
    // const [major, setMajor] = useState("");
    // const [year, setYear] = useState(0);
    // const [clubs, setClubs] = useState([]);
    // const [recommendations, setRecommendations] = useState([]);
    // const [allAttributes, setAllAttributes] = useState({});

    // const userRef = collection(db, "users");

    // const editUserProfile = async (
    //   id: string,
    //   major: string,
    //   year: number,
    //   clubs: club[],
    //   recommendations: club[]
    // ) => {
    //   const userDocRef = doc(db, "users", id);
    //   await updateDoc(userDocRef, {
    //     major: major,
    //     academic_year: year,
    //     clubs: clubs,
    //     recommendation: recommendations,
    //   });
    // };

    // useEffect(() => {
    //   const getUserProfile = async () => {
    //     try {
    //       const querySnapshot = await getDocs(userRef);
    //       querySnapshot.forEach((doc) => {
    //         setId(doc.data().id);
    //         setMajor(doc.data().major);
    //         setYear(doc.data().academic_year);
    //         setClubs(doc.data().clubs);
    //         setRecommendations(doc.data().recommendation);
    //         console.log(doc.data());
    //       });
    //     } catch (error) {
    //       console.error("Error fetching user profile: ", error);
    //     }
    //   };
    //   getUserProfile();
    // }, []);
    // useEffect(() => {
    //   console.log(clubs)
    //   console.log(major)
    //   console.log(year)
    //   console.log(recommendations)
    //   console.log(id)
    // }, [clubs, major, year, recommendations, id])
    // <div className="flex">
    //   <div className="flex-column justify-items-center">
    //     <div
    //       style={{
    //         width: "400px",
    //         height: "750px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginLeft: "45px",
    //         marginRight: "45px",
    //         marginBottom: "45px",
    //         marginTop: "45px",
    //         display: "flex",
    //       }}
    //     >
    //       <h1 style={{ textAlign: "center" }}>Anonymous Student</h1>
    //       <div
    //         style={{
    //           flexDirection: "column",
    //           display: "flex",
    //           justifyContent: "flex-end",
    //           alignItems: "flex-end",
    //           width: "100%",
    //         }}
    //       >
    //         <Button
    //           onClick={() =>
    //             editUserProfile(id, major, year, clubs, recommendations)
    //           }
    //         >
    //           Edit Profile
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex-column">
    //     <div
    //       style={{
    //         width: "500px",
    //         height: "230px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginTop: "45px",
    //       }}
    //     >
    //       <h1>Your Clubs</h1>
    //     </div>
    //     <div
    //       style={{
    //         width: "500px",
    //         height: "230px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginTop: "30px",
    //       }}
    //     >
    //       <h1>Recommended Clubs</h1>
    //     </div>
    //     <div
    //       style={{
    //         width: "500px",
    //         height: "230px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginTop: "30px",
    //         marginBottom: "50px",
    //       }}
    //     >
    //       <h1>Your Messages</h1>
    //     </div>
    //   </div>
    //   <div className="flex-column justify-items-center">
    //     <div
    //       style={{
    //         width: "340px",
    //         height: "490px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginLeft: "45px",
    //         marginRight: "45px",
    //         marginBottom: "30px",
    //         marginTop: "45px",
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         justifyItems: "center",
    //       }}
    //     >
    //       <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
    //         Club Events
    //       </h1>
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //           width: "100%",
    //         }}
    //       >
    //         <Calendar />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         width: "340px",
    //         height: "230px",
    //         backgroundColor: "lightgray",
    //         padding: 10,
    //         borderRadius: "10px",
    //         marginTop: "30px",
    //         marginBottom: "50px",
    //         marginLeft: "45px",
    //       }}
    //     >
    //       <h1 style={{ textAlign: "left" }}>Stats</h1>
    //     </div>
    //   </div>
    // </div>
  );
}

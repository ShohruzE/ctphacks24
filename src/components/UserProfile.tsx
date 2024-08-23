"use client"

import { db } from "@/firebase";
import { getDocs, doc, updateDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"

interface club{
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
   const [id, setId] = useState("");
   const [major, setMajor] = useState("");
   const [year, setYear] = useState(0);
   const [clubs, setClubs] = useState([]);
   const [recommendations, setRecommendations] = useState([]);
   const [allAttributes, setAllAttributes] = useState({});

   const userRef = collection(db, "users");

   const editUserProfile = async (id:string, major: string, year: number, clubs: club[], recommendations: club[]) => {
       const userDocRef = doc(db, "users", id);
       await updateDoc(userDocRef, {
           major: major,
           academic_year: year,
           clubs: clubs,
           recommendation: recommendations,

       });
   }

   useEffect(() => {
       const getUserProfile = async () => {
           try {
               const querySnapshot = await getDocs(userRef);
               querySnapshot.forEach((doc) => {
                   setId(doc.data().id);
                   setMajor(doc.data().major);
                   setYear(doc.data().academic_year);
                   setClubs(doc.data().clubs);
                   setRecommendations(doc.data().recommendation);
                   console.log(doc.data());
               });
           } catch (error) {
               console.error("Error fetching user profile: ", error);
           }
       };
       getUserProfile();
   }, []);

   return (
         <div className="flex">
            <div className="flex-column justify-items-center">
               <div 
                  style={{
                     width: '400px', height: '750px', backgroundColor: 'lightgray', padding: 10, 
                     borderRadius: '10px', marginLeft:'45px', marginRight: '45px', marginBottom: '45px', 
                     marginTop: '45px', display: 'flex'
                  }}>
                  <h1 style={{textAlign:'center'}}>Anonymous Student</h1>
                  <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
                     <Button onClick={() => editUserProfile(id, major, year, clubs, recommendations)}>Edit Profile</Button>
                  </div>
               </div>
            </div>
            <div className="flex-column">
               <div style={{width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '45px'}}>
                  <h1>Your Clubs</h1>
               </div>
               <div style={{width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '30px'}}>
                  <h1>Recommended Clubs</h1>
               </div>
               <div style={{width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '30px', marginBottom: '50px'}}>
                  <h1>Your Messages</h1>
               </div>
            </div>
            <div className='flex-column justify-items-center'>
               <div 
                  style={{
                  width: '340px', height: '490px', backgroundColor: 'lightgray',
                  padding: 10, borderRadius: '10px', marginLeft:'45px', marginRight: '45px', 
                  marginBottom: '30px', marginTop: '45px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', justifyItems: 'center'
                  }}>
                  <h1 style={{textAlign: 'center', marginBottom:'30px'}}>Club Events</h1>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                     <Calendar />
                  </div>
               </div>
               <div 
                  style={{
                     width: '340px', height: '230px', backgroundColor: 'lightgray', padding: 10, 
                     borderRadius: '10px', marginTop: '30px', marginBottom: '50px', marginLeft: '45px'
                     }}>
                  <h1 style={{textAlign: 'left'}}>Stats</h1>
               </div>
            </div>
         </div>
      );
}
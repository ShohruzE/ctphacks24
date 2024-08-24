"use client";
// include componenet imports
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

export default function userProfile() {
   const { userId } = useAuth();
   const [clubs, setClubs] = useState()
   const getClubs = async () => {
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
      <></>
   );
}
// <div className="flex">
//    <div className="flex-column justify-items-center">
//       <div
//          style={{
//             width: '400px', height: '750px', backgroundColor: 'lightgray', padding: 10,
//             borderRadius: '10px', marginLeft: '45px', marginRight: '45px', marginBottom: '45px',
//             marginTop: '45px', display: 'flex'
//          }}>
//          <h1 style={{ textAlign: 'center' }}>Anonymous Student</h1>
//          <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
//             <Button >Edit Profile</Button>
//          </div>
//       </div>
//    </div>
//    <div className="flex-column">
//       <div style={{ width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '45px' }}>
//          <h1>Your Clubs</h1>
//       </div>
//       <div style={{ width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '30px' }}>
//          <h1>Recommended Clubs</h1>
//       </div>
//       <div style={{ width: '500px', height: '230px', backgroundColor: 'lightgray', padding: 10, borderRadius: '10px', marginTop: '30px', marginBottom: '50px' }}>
//          <h1>Your Messages</h1>
//       </div>
//    </div>
//    <div className='flex-column justify-items-center'>
//       <div
//          style={{
//             width: '340px', height: '490px', backgroundColor: 'lightgray',
//             padding: 10, borderRadius: '10px', marginLeft: '45px', marginRight: '45px',
//             marginBottom: '30px', marginTop: '45px', display: 'flex', flexDirection: 'column',
//             justifyContent: 'center', justifyItems: 'center'
//          }}>
//          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Club Events</h1>
//          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
//             <Calendar />
//          </div>
//       </div>
//       <div
//          style={{
//             width: '340px', height: '230px', backgroundColor: 'lightgray', padding: 10,
//             borderRadius: '10px', marginTop: '30px', marginBottom: '50px', marginLeft: '45px'
//          }}>
//          <h1 style={{ textAlign: 'left' }}>Stats</h1>
//       </div>
//    </div>
// </div>
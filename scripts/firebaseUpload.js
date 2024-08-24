import { readFileSync } from "fs";
import { db } from "../src/firebase.js";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const data = JSON.parse(readFileSync("../club_json_files/clubs.json", "utf-8"));

async function uploadData() {
  try {
    const collectionRef = collection(db, "clubs");

    for (const club of data.clubs) {
      const docRef = await addDoc(collectionRef, club);
      await setDoc(
        doc(db, "clubs", docRef.id),
        {
          id: docRef.id,
        },
        { merge: true }
      );
      console.log("Document written with ID: ", club.id);
    }

    console.log("All data uploaded successfully.");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

uploadData();

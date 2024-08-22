import { readFileSync } from 'fs';
import { db } from '../src/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const data = JSON.parse(readFileSync('mockData.json', 'utf-8'));

async function uploadData() {
  try {
	const collectionRef = collection(db, 'clubs');

	for (const club of data.clubs) {
	  await addDoc(collectionRef, club);
	  console.log('Document written with ID: ', club.name);
	}

	console.log('All data uploaded successfully.');
  } catch (error) {
	console.error('Error adding document: ', error);
  }
}

uploadData();
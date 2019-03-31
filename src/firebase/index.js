// /**
//  * Firebase Login
//  * LeadTracker comes with built in firebase login feature
//  * You Need To Add Your Firsebase App Account Details Here
//  */
import { initializeApp, database } from 'firebase';

const config = {
  apiKey: "AIzaSyB9zP-jKaBfw88gzH7mS8XCSvE5YxYr1BM",
  authDomain: "leadtracker-52c0e.firebaseapp.com",
  databaseURL: "https://leadtracker-52c0e.firebaseio.com",
  projectId: "leadtracker-52c0e",
  storageBucket: "leadtracker-52c0e.appspot.com",
  messagingSenderId: "283047540296"
}
initializeApp(config);
const firebaseDatabase = database();

export {
  firebaseDatabase
}
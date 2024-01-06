// src/services/FirestoreService.js
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, doc, updateDoc, increment,getDoc,setDoc } from 'firebase/firestore';
import db from '../firebase';

const challengesCollection = collection(db, 'challenges');
const usersCollection = collection(db, 'users'); 

const FirestoreService = {
  async isEmployeeIdAvailable(employeeId) {
    const userDoc = doc(usersCollection, employeeId);
    const userDocSnapshot = await getDoc(userDoc);
    return !userDocSnapshot.exists();
  },
  async isEmployeeIdValid(employeeId) {
    const userDoc = doc(usersCollection, employeeId);
    const userDocSnapshot = await getDoc(userDoc);
    return userDocSnapshot.exists();
  },
   async registerUser(employeeId) {
    const userDoc = doc(usersCollection, employeeId);
    await setDoc(userDoc, {});
  },
  async getChallenges() { 
    const challengesQuery = query(challengesCollection, orderBy('votes', 'desc'));
    const snapshot = await getDocs(challengesQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addChallenge(newChallenge) {
    await addDoc(challengesCollection, newChallenge);
  },

  onChallengesUpdate(callback) {
    return onSnapshot(challengesCollection, (snapshot) => {
      const challenges = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(challenges);
    });
  },    

  async incrementVotes(challengeId) {
    const challengeRef = doc(challengesCollection, challengeId);
    await updateDoc(challengeRef, {
      votes: increment(1),
    });
  },
};

export default FirestoreService;

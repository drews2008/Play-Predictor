import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export interface PlayData {
  id?: string;
  userId: string;
  name: string;
  data: any;  // Customize per your play data shape
  createdAt: Timestamp;
}

export async function savePlay(play: PlayData) {
  if (play.id) {
    const playRef = doc(db, "plays", play.id);
    await setDoc(playRef, play);
  } else {
    const playRef = doc(collection(db, "plays"));
    await setDoc(playRef, { ...play, id: playRef.id });
  }
}

export async function loadPlays(userId: string): Promise<PlayData[]> {
  const playsCol = collection(db, "plays");
  const q = query(playsCol, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as PlayData);
}

// src/services/drawingService.ts

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

export interface Drawing {
  id?: string;            // Firestore doc ID
  userId: string;         // Owner user ID
  name: string;           // Drawing/play name
  createdAt: number;      // Timestamp (milliseconds)
  updatedAt: number;      // Timestamp (milliseconds)
  data: any;              // Serialized drawing data (routes, players, etc)
}

const drawingsCollection = collection(db, "drawings");

export async function saveDrawing(drawing: Omit<Drawing, "id">): Promise<string> {
  const docRef = await addDoc(drawingsCollection, drawing);
  return docRef.id;
}

export async function getDrawingsByUser(userId: string): Promise<Drawing[]> {
  const q = query(drawingsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Drawing));
}

export async function getDrawingById(id: string): Promise<Drawing | null> {
  const docRef = doc(db, "drawings", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Drawing;
  } else {
    return null;
  }
}

export async function updateDrawing(id: string, updatedFields: Partial<Drawing>): Promise<void> {
  const docRef = doc(db, "drawings", id);
  await updateDoc(docRef, updatedFields);
}

export async function deleteDrawing(id: string): Promise<void> {
  const docRef = doc(db, "drawings", id);
  await deleteDoc(docRef);
}

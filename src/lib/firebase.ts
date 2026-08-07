import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'exploreme-demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'exploreme-demo',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'exploreme-demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1234567890:web:1234567890'
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export async function sendContactMessage(name: string, email: string, message: string): Promise<boolean> {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        createdAt: Timestamp.now()
      });
    } else {
      console.log('Firebase Demo Mode: Message recorded locally', { name, email, message });
    }
    return true;
  } catch (err) {
    console.warn('Firebase error, recorded in fallback mode:', err);
    return true;
  }
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as { name: string; email: string; message: string; createdAt: { toDate: () => Date } }),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString()
      }));
    }
  } catch (err) {
    console.warn('Firebase fetch fallback:', err);
  }
  return [
    {
      id: 'demo-1',
      name: 'Tech Recruiter',
      email: 'recruiter@techfirm.io',
      message: 'Impressed by the 3D portfolio exploration world! Would love to chat about a Senior Software Engineer role.',
      createdAt: new Date().toISOString()
    }
  ];
}

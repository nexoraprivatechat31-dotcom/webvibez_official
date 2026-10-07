import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyByDA3ORoRBMuVaFkEf2Up7BtNm06aeGXI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "webvibez-academy.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "webvibez-academy",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "webvibez-academy.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "691152122884",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:691152122884:web:778c702bae432046ee3151",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-P5MVNKXR7C",
};

// Initialize Firebase App (Server & Client Safe)
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;

// Initialize Analytics only in client-side supported environment
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== "undefined" && !analytics) {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(app);
    }
  }
  return analytics;
};

export { app, analytics, firebaseConfig };

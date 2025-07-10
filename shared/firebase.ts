import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 🔐 Segurança extra: evite chamadas antecipadas a getFirestore()
let db: Firestore;
console.log("Apps:", getApps().length); // deve ser 1
console.log("App name:", app.name);     // deve ser "[DEFAULT]"

try {
  db = getFirestore(app);
} catch (error) {
  console.error("Erro ao inicializar Firestore:", error);
}

export const auth = getAuth(app);
export { db };

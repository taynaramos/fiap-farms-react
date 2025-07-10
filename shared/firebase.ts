import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar o app Firebase
let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app inicializado:", app.name);
} else {
  app = getApp();
  console.log("Firebase app já existente:", app.name);
}

// Inicializar Auth primeiro
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);

// Conectar aos emuladores em desenvolvimento (opcional)
if (import.meta.env.DEV) {
  try {
    // Descomente as linhas abaixo se quiser usar emuladores locais
    // connectAuthEmulator(auth, "http://localhost:9099");
    // connectFirestoreEmulator(db, "localhost", 8080);
  } catch (error) {
    console.warn("Erro ao conectar aos emuladores:", error);
  }
}

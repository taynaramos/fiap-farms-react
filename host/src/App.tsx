import { onAuthStateChanged } from 'firebase/auth';
import { lazy, Suspense, useEffect, useState } from "react";
import { auth } from './firebase';

const Remote = lazy(
  // @ts-ignore
  async () => import("remote/remote-app")
);

const Login = lazy(
  // @ts-ignore
  async () => import("login/login-app")
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔐= Verifica se o usuário já está logado (mesmo após refresh)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });
    return unsub;
  }, []);

  // 📡 Escuta o evento customizado do microfrontend de login
  useEffect(() => {
    const listener = (e: CustomEvent) => {
      console.log("Usuário logado:", e.detail);
      setIsAuthenticated(true);
    };
    window.addEventListener("user-logged-in", listener as EventListener);

    return () => {
      window.removeEventListener("user-logged-in", listener as EventListener);
      console.log("Removendo listener");
    };
  }, []);

  return (
    <Suspense fallback="Loading...">
      {isAuthenticated ? <Remote /> : <Login />}
    </Suspense>
  );
}

import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { auth } from "shared/firebase";
import Routes from "../routes";

const Remote = lazy(
  // @ts-ignore
  async () => import("remote/remote-app")
);

const Login = lazy(
  // @ts-ignore
  async () => import("login/login")
);

const CreateAccount = lazy(
  // @ts-ignore
  async () => import("login/create-account")
);

export default function Initial() {
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
      setIsAuthenticated(true);
    };
    window.addEventListener("user-logged-in", listener as EventListener);

    return () => {
      window.removeEventListener("user-logged-in", listener as EventListener);
    };
  }, []);

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RouterRoutes>
        <Route
          path={Routes.paths.root}
          element={
            isAuthenticated ? (
              <Navigate to={Routes.paths.home} replace />
            ) : (
              <Navigate to={Routes.paths.login} replace />
            )
          }
        />
        <Route path={Routes.paths.login} element={<Login />} />
        <Route path={Routes.paths.createAccount} element={<CreateAccount />} />
        <Route path={Routes.paths.home} element={<Remote />} />
      </RouterRoutes>
    </Suspense>
  );
}

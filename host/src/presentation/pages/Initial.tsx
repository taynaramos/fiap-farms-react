import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { auth } from "shared/firebase";
import Routes from "shared/routes";

const RemoteRoutes = lazy(
  // @ts-ignore
  async () => import("remote/remote-routes")
);

const LoginRoutes = lazy(
  // @ts-ignore
  async () => import("login/login-routes")
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
              <Navigate to={Routes.paths.dashboard_producao} replace />
            ) : (
              <Navigate to={Routes.paths.login} replace />
            )
          }
        />
        <Route path="/login/*" element={<LoginRoutes />} />
        <Route path="/app/*" element={<RemoteRoutes />} />
      </RouterRoutes>
    </Suspense>
  );
}

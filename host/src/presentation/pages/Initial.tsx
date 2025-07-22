import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { auth, db } from "shared/firebase";
import Routes, { loginPath, remotePath } from "shared/routes";

const RemoteRoutes = lazy(
  // @ts-ignore
  async () => import("remote/remote-routes")
);

const LoginRoutes = lazy(
  // @ts-ignore
  async () => import("login/login-routes")
);

export default function Initial() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstAccess, setIsFirstAccess] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Busca o userDoc para verificar isFirstAccess
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setIsFirstAccess(Boolean(data.isFirstAccess));
        } else {
          setIsFirstAccess(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsFirstAccess(false);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  useEffect(() => {
    const listener = (e: CustomEvent) => {
      setIsAuthenticated(true);
      // Opcional: aqui você pode refazer a checagem de isFirstAccess se quiser
    };
    window.addEventListener("user-logged-in", listener as EventListener);

    return () => {
      window.removeEventListener("user-logged-in", listener as EventListener);
    };
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RouterRoutes>
        <Route
          path={Routes.paths.root}
          element={
            isAuthenticated ? (
              isFirstAccess ? (
                <Navigate to={remotePath(Routes.paths.changePassword)} replace />
              ) : (
                <Navigate to={remotePath(Routes.paths.dashboard_producao)} replace />
              )
            ) : (
              <Navigate to={loginPath(Routes.paths.login)} replace />
            )
          }
        />
        <Route path="/login/*" element={<LoginRoutes />} />
        <Route path="/app/*" element={<RemoteRoutes />} />
      </RouterRoutes>
    </Suspense>
  );
}

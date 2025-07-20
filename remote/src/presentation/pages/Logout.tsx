import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "shared/firebase";
import Routes, { loginPath } from "shared/routes";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth).finally(() => {
      window.dispatchEvent(new CustomEvent("user-logged-out"));
      navigate(loginPath(Routes.paths.login), { replace: true });
    });
  }, [navigate]);

  return null;
} 
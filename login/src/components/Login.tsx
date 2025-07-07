// src/components/Login.tsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", userCred.user);
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: userCred })
      );
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div>
      <h2>Login Firebase</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Senha"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Entrar</button>
    </div>
  );
}

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createAccount = async () => {
    setError("");
    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, insira um email válido.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado:", newUser.user);
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: newUser })
      );
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.");
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div>
      <h2>Create Account Firebase</h2>
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
      <button onClick={createAccount}>Criar conta</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

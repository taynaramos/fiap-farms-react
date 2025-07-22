import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "shared/firebase";
import Routes, { loginPath, remotePath } from "shared/routes";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setFirebaseError("");

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Insira um email válido.");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      isValid = false;
    }

    return isValid;
  };

  const login = async () => {
    if (!validateFields()) return;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", userCred.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.isFirstAccess) {
          navigate(remotePath(Routes.paths.changePassword));
          return;
        }
      }

      // Caso contrário, redireciona para dashboard normal
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: userCred })
      );
      navigate(remotePath(Routes.paths.dashboard_producao));
    } catch (error) {
      console.error("Erro ao logar:", error);
      setFirebaseError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ color: "#1B5E20", fontWeight: "bold" }}
          >
            FIAP Farms
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              placeholder="Digite seu email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
            />

            <TextField
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />

            {firebaseError && <Alert severity="error">{firebaseError}</Alert>}

            <Button variant="contained" color="success" fullWidth onClick={login}>
              Entrar
            </Button>

            <Button
              variant="text"
              color="success"
              fullWidth
              onClick={() => navigate(loginPath(Routes.paths.createAccount))}
            >
              Criar conta
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

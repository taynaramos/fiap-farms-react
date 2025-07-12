import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "shared/firebase";

import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");


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
      console.log("Usuário logado:", userCred.user);
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: userCred })
      );
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
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />

            {firebaseError && <Alert severity="error">{firebaseError}</Alert>}

            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={login}
            >
              Entrar
            </Button>

            <Button
              variant="text"
              color="success"
              fullWidth
              onClick={() => console.log("/create-account")}
            >
              Criar conta
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

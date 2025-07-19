import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "shared/firebase";
import { useNavigate } from "react-router-dom";
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
import Routes from "shared/routes";

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: newUser })
      );
      navigate(Routes.paths.home);
    } catch (error) {
      setError("Erro ao criar conta. Tente novamente.");
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
            Criar Conta
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email"
              placeholder="Digite seu email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              placeholder="Digite sua senha"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={createAccount}
            >
              Criar conta
            </Button>

            <Button
              variant="text"
              color="success"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Voltar ao login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

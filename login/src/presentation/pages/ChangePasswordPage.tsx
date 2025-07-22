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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes, { loginPath, remotePath } from "shared/routes";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "shared/firebase";

function validatePasswordStrength(password: string) {
  const re = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return re.test(password);
}

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const changePassword = async () => {
    setError("");
    setSuccessMsg("");

    if (!currentPassword) {
      setError("Digite a senha atual para confirmar.");
      return;
    }

    if (!validatePasswordStrength(newPassword)) {
      setError(
        "Senha fraca. Use ao menos 6 caracteres, uma letra maiúscula e um número."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (!auth.currentUser || !auth.currentUser.email) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { isFirstAccess: false });

      setSuccessMsg("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      setTimeout(() => {
        navigate(remotePath(Routes.paths.dashboard_producao)); // ajuste conforme sua rota
      }, 1500);
    } catch (err: any) {
      if (err.code === "auth/wrong-password") {
        setError("Senha atual incorreta.");
      } else if (err.code === "auth/weak-password") {
        setError("A nova senha é muito fraca.");
      } else {
        setError("Erro ao alterar a senha. Tente novamente.");
      }
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
            Alterar Senha - Primeiro Acesso
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Senha atual"
              type="password"
              variant="outlined"
              placeholder="Digite sua senha atual"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <TextField
              label="Nova senha"
              type="password"
              variant="outlined"
              placeholder="Digite a nova senha"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
              label="Confirme a nova senha"
              type="password"
              variant="outlined"
              placeholder="Confirme a nova senha"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}

            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={changePassword}
            >
              Alterar senha
            </Button>

            <Button
              variant="text"
              color="success"
              fullWidth
              onClick={() => navigate(loginPath(Routes.paths.login))}
            >
              Voltar ao login
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

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
import Routes, { loginPath } from "shared/routes";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const changePassword = async () => {
    setError("");
    setSuccessMsg("");

    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (!currentPassword) {
      setError("Digite a senha atual para confirmar.");
      return;
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
            Alterar Senha
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

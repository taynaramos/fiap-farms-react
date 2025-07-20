import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { User, UserRole } from "../../domain/entities/User";
import { CreateUserUseCase } from "../../domain/usecases/user/CreateUserUseCase";
import { UserRepositoryFirebase } from "../../infra/repositories/UserRepositoryFirebase";
import withLayoutAndAuth from "./withLayoutAndAuth";

const ROLES: UserRole[] = ["admin", "membro"];

function CreateUserPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("membro");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTempPassword(null);
    try {
      const repo = new UserRepositoryFirebase();
      const usecase = new CreateUserUseCase(repo);
      const user = new User("", email, displayName, role, new Date());
      const password = await usecase.execute(user);
      setSnackbar({
        open: true,
        message: "Usuário criado com sucesso!",
        severity: "success",
      });
      setTempPassword(password);
      setDisplayName("");
      setEmail("");
      setRole("membro");
    } catch (e: any) {
      setSnackbar({
        open: true,
        message: e.message || "Erro ao cadastrar usuário",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Cadastro de Usuário
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          type="email"
        />
        <TextField
          select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          fullWidth
          margin="normal"
        >
          {ROLES.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Cadastrando..." : "Cadastrar Usuário"}
        </Button>
      </form>
      {tempPassword && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Senha temporária: <b>{tempPassword}</b>
        </Alert>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default withLayoutAndAuth(CreateUserPage);

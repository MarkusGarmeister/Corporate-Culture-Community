import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useLogin } from "react-admin";

interface LoginPopup {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const Login = ({ open, onClose, onLogin }: LoginPopup) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ username: email, password });
      onLogin();
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Welcome Back</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Log in to access the venue marketplace and connect with the community.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6">Email</Typography>
          <TextField
            id="email"
            type="email"
            placeholder="your.email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoFocus
          />
          <Typography variant="h6">Password</Typography>
          <TextField
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" fullWidth>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

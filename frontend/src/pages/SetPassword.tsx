import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NotFound } from "./404NotFound";
import { CheckCircle2 } from "lucide-react";
import { passwordRules, passwordRequirements } from "../utils/validation";
import { useFormValidation } from "../hooks/useFormValidation";

interface SetPasswordForm {
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const PasswordRequirements = ({ password }: { password: string }) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="subtitle2" gutterBottom>
        Password must:
      </Typography>
      <List dense sx={{ pl: 1 }}>
        {passwordRequirements.map((requirement) => (
          <ListItem key={requirement.label}>
            <ListItemIcon>
              {requirement.test(password) ? (
                <CheckCircle2 size={20} color="#10b981" />
              ) : (
                <CheckCircle2 size={20} color="#9ca3af" />
              )}
            </ListItemIcon>
            <ListItemText primary={requirement.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [matchPasswordError, setMatchPasswordError] = useState("");

  const handleSetPassword = async (formValues: SetPasswordForm) => {
    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      setMatchPasswordError("Passwords do not match");
      return;
    }
    setMatchPasswordError("");
    setLoading(true);
    //TODO backend call to set password
    setLoading(false);
    navigate("/login");
  };

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<SetPasswordForm>(
      {
        password: "",
        confirmPassword: "",
      },
      passwordRules,
      handleSetPassword,
    );

  if (!token) {
    return <NotFound />;
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 420, mx: "auto", mt: 8, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Set your Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="New Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              value={values.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordRequirements password={values.password} />
            {errors.password && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.password}
              </Typography>
            )}
            {matchPasswordError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {matchPasswordError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Setting Password..." : "Set Password"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

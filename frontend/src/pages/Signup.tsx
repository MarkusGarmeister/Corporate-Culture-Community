import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Grid,
} from "@mui/material";

const API_URL = "http://localhost:8000/";

interface SignupPopup {
  open: boolean;
  onClose: () => void;
  onSignup: () => void;
}

export const Signup = ({ open, onClose, onSignup }: SignupPopup) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    company: "",
    jobPosition: "",
    linkedinUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const backendData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        city: formData.city || undefined,
        company: formData.company || undefined,
        work_position: formData.jobPosition || undefined,
        linkedin_url: formData.linkedinUrl || undefined,
      };

      const response = await axios.post(`${API_URL}users/`, backendData);
      console.log("Signup successful:", response.data);

      onSignup();
      onClose();
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Join Our Community</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create your account to access the venue marketplace
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </Grid>

            {/* City */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="city"
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="company"
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </Grid>

            {/* Work Position */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="jobPosition"
                label="Work Position"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                autoComplete="organization-title"
              />
            </Grid>

            {/* LinkedIn URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="linkedinUrl"
                label="LinkedIn URL"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, flexDirection: "column", gap: 1 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <Button onClick={onClose} variant="outlined" fullWidth>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const API_URL = "http://localhost:8000/";

export const Signup = () => {
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

      const response = await axios.post(`${API_URL}/auth/signup`, backendData);

      console.log("Signup successful:", response.data);

      window.location.href = "/";
    } catch (error: any) {
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
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Join our Corporate Culture Community
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {/* First Name */}
              <Grid>
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
              <Grid>
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
              <Grid>
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
              <Grid>
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
              <Grid>
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
              <Grid>
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
              <Grid>
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
              <Grid>
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

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            {/* Link to Login */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link component={RouterLink} to="/" underline="hover">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

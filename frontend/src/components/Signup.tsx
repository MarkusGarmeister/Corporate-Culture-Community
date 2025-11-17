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
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useFormValidation } from "../hooks/useFormValidation";
import { DepartmentDropDown } from "./Departments";
import { validationRules } from "../utils/validation";
import { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "https://joinculture.co/";

interface SignupPopup {
  open: boolean;
  onClose: () => void;
  onSignup: () => void;
}

export const Signup = ({ open, onClose, onSignup }: SignupPopup) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleFormSubmit = async (formValues: User) => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/`, formValues);
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

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<User>(
      {
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        company: "",
        work_position: "",
        linkedin_url: "",
        department: "",
      },
      validationRules,
      handleFormSubmit,
    );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
        },
      }}
    >
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
                id="first_name"
                label="First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
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
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                autoComplete="address-level2"
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                value={values.company}
                onChange={handleChange}
                error={!!errors.company}
                helperText={errors.company}
              />
            </Grid>

            {/* Work Position */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="jobPosition"
                label="Work Position"
                name="work_position"
                value={values.work_position}
                onChange={handleChange}
                error={!!errors.work_position}
                helperText={errors.work_position}
              />
            </Grid>

            {/* Departments */}
            <Grid item xs={12}>
              <DepartmentDropDown
                value={values.department}
                onChange={(value) =>
                  handleChange({
                    target: { name: "department", value },
                  })
                }
                error={errors.department}
                required
              />
            </Grid>

            {/* LinkedIn URL */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="linkedInUrl"
                label="LinkedIn URL"
                name="linkedin_url"
                type="url"
                value={values.linkedin_url}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
                error={!!errors.linkedin_url}
                helperText={errors.linkedin_url}
              />
            </Grid>

            {/* Privacy Policy Checkbox */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <Typography variant="body2">
                    I have read and agree to the{" "}
                    <Link
                      href="#/privacy-policy"
                      target="_blank"
                      rel="noopener"
                      sx={{ color: "primary.main" }}
                    >
                      Privacy Policy.
                    </Link>{" "}
                  </Typography>
                }
                checked={isChecked}
                onChange={(e, checked) => setIsChecked(checked)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, flexDirection: "row", gap: 1 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disabled={!isChecked || loading}
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

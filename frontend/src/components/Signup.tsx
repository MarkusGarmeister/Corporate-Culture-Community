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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useFormValidation } from "../hooks/useFormValidation";

const API_URL = "http://localhost:8000/";

const departments = [
  {
    value: "people-operations",
    label: "1. People Operations",
    description: "HR Manager, Payroll, People Ops, HRIS",
  },
  {
    value: "talent-growth",
    label: "2. Talent & Growth",
    description: "Talent Acquisition, L&D, Employer Branding",
  },
  {
    value: "culture-engagement",
    label: "3. Culture & Engagement",
    description:
      "People & Culture Manager, Experience Manager, DEI, Internal Comms",
  },
  {
    value: "workplace-experience",
    label: "4. Workplace & Experience",
    description: "Office Manager, Workplace Manager, Feelgood",
  },
  {
    value: "leadership-strategy",
    label: "5. Leadership & Strategy",
    description:
      "Chief People Officer, Head of People, HR Business Partner, Chief of Staff",
  },
];
interface SignupPopup {
  open: boolean;
  onClose: () => void;
  onSignup: () => void;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  company: string;
  jobPosition: string;
  linkedInUrl: string;
  department: string;
  [key: string]: string;
}

const validationRules = {
  firstName: (value: string) =>
    value.trim() !== "" ? "" : "First name is required",
  lastName: (value: string) =>
    value.trim() !== "" ? "" : "Last name is required",
  email: (value: string) => {
    if (value.trim() === "") return "Email is required";
    if (!value.includes("@")) return "Email must be valid";
    return "";
  },
  city: (value: string) => (value.trim() !== "" ? "" : "City is required"),
  company: (value: string) =>
    value.trim() !== "" ? "" : "Company is required",
  jobPosition: (value: string) =>
    value.trim() !== "" ? "" : "Job position is required",
  linkedInUrl: (value: string) => {
    if (value.trim() === "") return "LinkedIn URL is required";
    if (!value.startsWith("https://www.linkedin.com/"))
      return "LinkedIn URL must be valid";
    return "";
  },
  department: (value: string) =>
    value.trim() !== "" ? "" : "Department is required",
};

export const Signup = ({ open, onClose, onSignup }: SignupPopup) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleFormSubmit = async (formValues: SignupFormData) => {
    setError("");
    setLoading(true);

    try {
      const backendData = {
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email: formValues.email,
        city: formValues.city,
        company: formValues.company,
        work_position: formValues.jobPosition,
        linkedin_url: formValues.linkedInUrl,
        department: formValues.department,
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

  const { values, errors, handleChange, handleSubmit } =
    useFormValidation<SignupFormData>(
      {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        company: "",
        jobPosition: "",
        linkedInUrl: "",
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
                id="firstName"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                error={!!errors.firstName}
                helperText={errors.firstName}
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
                value={values.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                error={!!errors.lastName}
                helperText={errors.lastName}
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
                autoComplete="organization"
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
                name="jobPosition"
                value={values.jobPosition}
                onChange={handleChange}
                autoComplete="organization-title"
                error={!!errors.jobPosition}
                helperText={errors.jobPosition}
              />
            </Grid>

            {/* Departments */}
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.department}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  label="Departments"
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.value} value={dept.value}>
                      <Box>
                        <Typography variant="body1">{dept.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {dept.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.department && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.75 }}
                  >
                    {errors.department}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* LinkedIn URL */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="linkedInUrl"
                label="LinkedIn URL"
                name="linkedInUrl"
                type="url"
                value={values.linkedInUrl}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
                error={!!errors.linkedInUrl}
                helperText={errors.linkedInUrl}
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

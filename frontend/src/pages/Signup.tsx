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
}

const validateFormData = (formData: SignupFormData) => {
  return (
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.company.trim() !== "" &&
    formData.jobPosition.trim() !== "" &&
    formData.department.trim() !== "" &&
    formData.linkedInUrl.trim() !== ""
  );
};

export const Signup = ({ open, onClose, onSignup }: SignupPopup) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    company: "",
    jobPosition: "",
    linkedInUrl: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } },
  ) => {
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
        city: formData.city,
        company: formData.company,
        work_position: formData.jobPosition,
        linkedin_url: formData.linkedInUrl,
        department: formData.department,
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

            {/* City */}
            <Grid item xs={12}>
              <TextField
                required
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
                required
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
                required
                fullWidth
                id="jobPosition"
                label="Work Position"
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                autoComplete="organization-title"
              />
            </Grid>

            {/* Departments */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={formData.department}
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
                value={formData.linkedInUrl}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
              />
            </Grid>
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
          disabled={!isChecked || !validateFormData(formData) || loading}
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

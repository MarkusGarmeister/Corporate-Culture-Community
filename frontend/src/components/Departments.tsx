import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

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

interface DepartmentDropDownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const DepartmentDropDown = ({
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}: DepartmentDropDownProps) => {
  return (
    <FormControl
      fullWidth
      required={required}
      error={!!error}
      disabled={disabled}
    >
      <InputLabel id="department-label">Department</InputLabel>
      <Select
        labelId="department-label"
        id="department"
        name="department"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

import PasswordValidator from "password-validator";

export const validationRules = {
  first_name: (value: string) =>
    value.trim() !== "" ? "" : "First name is required",
  last_name: (value: string) =>
    value.trim() !== "" ? "" : "Last name is required",
  email: (value: string) => {
    if (value.trim() === "") return "Email is required";
    if (!value.includes("@")) return "Email must be valid";
    return "";
  },
  city: (value: string) => (value.trim() !== "" ? "" : "City is required"),
  company: (value: string) =>
    value.trim() !== "" ? "" : "Company is required",
  work_position: (value: string) =>
    value.trim() !== "" ? "" : "Job position is required",
  linkedin_url: (value: string) => {
    if (value.trim() === "") return "LinkedIn URL is required";
    if (!value.startsWith("https://www.linkedin.com/"))
      return "LinkedIn URL must be valid";
    return "";
  },
  department: (value: string) =>
    value.trim() !== "" ? "" : "Department is required",
};

const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();
export const passwordRules = {
  password: (value: string) => {
    if (!passwordSchema.validate(value)) {
      return "Invalid password. Please choose a more secure one.";
    }

    return "";
  },
};

export interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    label: "Be at least 8 characters long",
    test: (password) => password.length >= 8,
  },
  {
    label: "Contain at least one lowercase letter (a-z)",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contain at least one uppercase letter (A-Z)",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contain at least one number (0-9)",
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contain at least one special character (!@#$%^&*...)",
    test: (password) => /[^a-zA-Z0-9]/.test(password),
  },
];

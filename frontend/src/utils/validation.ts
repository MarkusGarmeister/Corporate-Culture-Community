export const validationRules = {
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

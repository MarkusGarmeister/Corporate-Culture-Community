import { createTheme } from "@mui/material/styles";

// Monochrome theme based on designs
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A1A1A", // Black for primary buttons and main elements
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#666666", // Gray for secondary text
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF", // White background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A", // Black text
      secondary: "#666666", // Gray text
    },
    divider: "#E5E5E5", // Light gray borders
    warning: {
      main: "#FFC107", // Gold for ratings/stars
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#1A1A1A",
    },
    body1: {
      fontSize: "1rem",
      color: "#1A1A1A",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase transformation
          borderRadius: "6px",
          padding: "10px 24px",
          fontSize: "1rem",
        },
        contained: {
          backgroundColor: "#1A1A1A",
          color: "#FFFFFF",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#000000",
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#E5E5E5",
          color: "#1A1A1A",
          "&:hover": {
            borderColor: "#1A1A1A",
            backgroundColor: "transparent",
          },
        },
        text: {
          color: "#1A1A1A",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: "1px solid #E5E5E5",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          color: "#1A1A1A",
          boxShadow: "none",
          borderBottom: "1px solid #E5E5E5",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E5E5E5",
            },
            "&:hover fieldset": {
              borderColor: "#1A1A1A",
            },
          },
        },
      },
    },
  },
});

// Export color constants for direct use if needed
export const colors = {
  background: "#FFFFFF",
  surface: "#FFFFFF",
  primary: "#1A1A1A",
  text: "#1A1A1A",
  textSecondary: "#666666",
  border: "#E5E5E5",
  accent: "#FFC107", // Gold for ratings
  icon: "#1A1A1A",
  iconBg: "#F5F5F5", // Light gray background for icon containers
  ctaText: "#FFFFFF",
};

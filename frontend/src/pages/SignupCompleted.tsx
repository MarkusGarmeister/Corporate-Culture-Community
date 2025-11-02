import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { Building2, CheckCircle, Mail } from "lucide-react";
import { colors } from "../theme";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
export const SignupCompleted = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
      }}
    >
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container sx={{ py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Building2 style={{ width: 32, height: 32, color: colors.icon }} />
            <Typography variant="h6" component="span">
              Corporate Culture Community
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container component="main" sx={{ py: 10 }}>
        <Box sx={{ maxWidth: 672, mx: "auto", textAlign: "center" }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
              backgroundColor: colors.iconBg,
            }}
          >
            <CheckCircle
              style={{ width: 64, height: 64, color: colors.icon }}
            />
          </Box>
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            Thank You for Your Application!
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Your application is under review. We'll get back to you via email
            within 2-3 business days.
          </Typography>
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Mail style={{ width: 20, height: 20, color: colors.icon }} />
              <Typography color="text.primary">Check your inbox</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              We've sent a confirmation email to the address you provided.
              Please check your spam folder if you don't see it in your inbox.
            </Typography>
          </Paper>
          <Paper sx={{ bgcolor: "grey.50", p: 3, mb: 4 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mb: 2, textAlign: "center" }}
            >
              What Happens Next?
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                "Our team will review your application and verify your information.",
                "You'll receive an email with your login credentials once approved.",
                "Start exploring venues and sharing your experiences with the community!",
              ].map((text, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: colors.iconBg,
                      color: colors.icon,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography color="text.primary" sx={{ textAlign: "left" }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
          <Button
            size="large"
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: colors.primary,
              color: colors.ctaText,
              "&:hover": {
                backgroundColor: colors.primary,
                opacity: 0.9,
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Building2, AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import { Footer } from "../components/Footer";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
      }}
    >
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 2,
            }}
          >
            <Building2 style={{ width: 32, height: 32, color: colors.icon }} />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontSize: "1.25rem" }}
            >
              Corporate Culture Community
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 10,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center" }}>
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
              <AlertCircle
                style={{ width: 64, height: 64, color: colors.icon }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "6rem", sm: "8rem", md: "9rem" },
                  fontWeight: "bold",
                  lineHeight: 1,
                  color: colors.primary,
                }}
              >
                404
              </Typography>
            </Box>

            <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
              Page Not Found
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 4,
                fontWeight: "normal",
              }}
            >
              Sorry, we couldn't find the page you're looking for. The page may
              have been moved or doesn't exist.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: 3,
                mb: 4,
                textAlign: "left",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ mb: 2, textAlign: "center" }}
              >
                What can you do?
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: colors.primary,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: "text.primary" }}>
                    Check the URL for any typos or errors
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: colors.primary,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: "text.primary" }}>
                    Go back to the previous page and try again
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: colors.primary,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: "text.primary" }}>
                    Return to the homepage to explore our venues
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/")}
                startIcon={<Home style={{ width: 20, height: 20 }} />}
                sx={{
                  bgcolor: colors.primary,
                  color: colors.ctaText,
                  "&:hover": {
                    bgcolor: colors.primary,
                    opacity: 0.9,
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

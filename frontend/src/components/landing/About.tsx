import { Button, Box, Container, Typography } from "@mui/material";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Connect with like-minded professionals in your field",
  "Access exclusive resources and industry insights",
  "Stay updated with the latest People & Culture trends",
  "Participate in thought-provoking discussions",
  "Grow your professional network organically",
  "Learn from real-world experiences and case studies",
];

export const About = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        background:
          "linear-gradient(to bottom right, rgba(139, 0, 255, 0.08), #FFFFFF, rgba(139, 0, 255, 0.05))",
      }}
    >
      <Container sx={{ px: 4 }}>
        <Box
          sx={{
            maxWidth: "72rem",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
            gap: 6,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 1,
                background: "rgba(74, 29, 140, 0.1)",
                borderRadius: "9999px",
                width: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                About Us
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.875rem", md: "2.25rem", lg: "3rem" },
                fontWeight: "bold",
                letterSpacing: "-0.025em",
              }}
            >
              Building Bridges in
              <Box
                component="span"
                sx={{
                  display: "block",
                  color: "primary.main",
                  mt: 1,
                }}
              >
                People & Culture
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "text.secondary",
                lineHeight: 1.625,
              }}
            >
              Corporate Culture Community is more than just a network —
              it&apos;s a movement of forward-thinking professionals dedicated
              to transforming workplace culture. We bring together Office
              Managers, Workplace Leaders, and HR professionals to create
              meaningful connections and drive positive change.
            </Typography>

            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "text.secondary",
                lineHeight: 1.625,
              }}
            >
              Whether you&apos;re looking to solve complex challenges, discover
              innovative solutions, or simply connect with peers who share your
              passion, you&apos;ve found your home.
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, width: "fit-content" }}
            >
              Learn More About Us
            </Button>
          </Box>

          {/* Right column - Benefits list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {benefits.map((benefit, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 2,
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "border-color 200ms ease",
                  "&:hover": {
                    borderColor: "primary.light",
                  },
                }}
              >
                <CheckCircle2
                  style={{
                    width: 24,
                    height: 24,
                    color: "#4A1D8C",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <Typography sx={{ color: "text.primary" }}>
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

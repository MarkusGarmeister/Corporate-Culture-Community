import { Button, Box, Container, Typography } from "@mui/material";
import { ArrowRight, Mail } from "lucide-react";

export const CTA = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(30deg, #4A1D8C 0%, rgba(74, 29, 140, 0.9) 50%, #8B00FF 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3), transparent 50%)",
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 10,
          px: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "48rem",
            mx: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem", lg: "3rem" },
              fontWeight: "bold",
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
            }}
          >
            Ready to Transform Your
            <Box component="span" sx={{ display: "block", mt: 1 }}>
              Professional Journey?
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1.125rem", md: "1.25rem" },
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "42rem",
              mx: "auto",
            }}
          >
            Join hundreds of People & Culture professionals who are already part
            of our vibrant community. Start connecting, learning, and growing
            today.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              pt: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                fontSize: "1.125rem",
                bgcolor: "#FFFFFF",
                color: "#4A1D8C",
                display: "inline-flex",
                alignItems: "center",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
                "& .arrow": {
                  transition: "transform 150ms ease",
                },
                "&:hover .arrow": {
                  transform: "translateX(4px)",
                },
              }}
            >
              <Mail style={{ marginRight: 8, width: 20, height: 20 }} />
              Get Started Now
              <ArrowRight
                className="arrow"
                style={{ marginLeft: 8, width: 20, height: 20 }}
              />
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                fontSize: "1.125rem",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

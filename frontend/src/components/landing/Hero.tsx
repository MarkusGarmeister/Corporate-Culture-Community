import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Container, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import { ArrowRight } from "lucide-react";
import logo from "../../assets/ccc-logo.png";
import { Signup } from "../Signup";
import { Login } from "../Login";

const heroFadeIn = keyframes`from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }`;

export const Hero = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(to bottom right, #FFFFFF, rgba(139, 0, 255, 0.08), #FFFFFF)",
      }}
    >
      <Button
        variant="outlined"
        size="large"
        onClick={() => setLoginOpen(true)}
        sx={{
          position: "absolute",
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 32 },
          zIndex: 20,
          fontSize: { xs: "1rem", md: "1.125rem" },
        }}
      >
        Login
      </Button>
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => {
          setLoginOpen(false);
          navigate("/welcome");
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 10,
          px: 4,
          py: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: "48rem",
            mx: "auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              mb: 4,
              animation: `${heroFadeIn} 1s ease-out`,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Corporate Culture Community"
              sx={{
                height: { xs: 128, md: 160 },
                width: "auto",
                mb: 4,
              }}
            />
          </Box>

          <Typography
            component="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: "-0.04em",
              fontSize: {
                xs: "2.25rem",
                md: "3.75rem",
                lg: "4.5rem",
              },
              lineHeight: 1.1,
              animation: `${heroFadeIn} 1s ease-out forwards`,
              animationDelay: "150ms",
            }}
          >
            Where People & Culture
            <Box
              component="span"
              sx={{
                display: "block",
                mt: 0.5,
                backgroundImage: "linear-gradient(to right, #4A1D8C, #8B00FF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Leaders Connect
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              maxWidth: "42rem",
              mx: "auto",
              fontSize: {
                xs: "1.125rem",
                md: "1.25rem",
              },
              color: "text.secondary",
              animation: `${heroFadeIn} 1s ease-out forwards`,
              animationDelay: "300ms",
            }}
          >
            Join a thriving community of Office, Workplace, and HR Managers who
            exchange insights, share knowledge, and grow together through
            meaningful connections and events.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              animation: `${heroFadeIn} 1s ease-out forwards`,
              animationDelay: "500ms",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setSignupOpen(true)}
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                display: "inline-flex",
                alignItems: "center",
                "& .arrow": {
                  transition: "transform 150ms ease",
                },
                "&:hover .arrow": {
                  transform: "translateX(4px)",
                },
              }}
            >
              Become a Member
              <ArrowRight
                className="arrow"
                style={{ marginLeft: 8, width: 20, height: 20 }}
              />
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                document.getElementById("events")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Explore Events
            </Button>
          </Box>

          <Signup
            open={signupOpen}
            onClose={() => setSignupOpen(false)}
            onSignup={() => {
              setSignupOpen(false);
              navigate("/signup/success");
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

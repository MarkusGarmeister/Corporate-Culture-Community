import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Building2, Users, MapPin, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "../theme";
import { useState } from "react";
import { Login } from "../components/Login";
import { Signup } from "./Signup";
import { Footer } from "../components/Footer";
export const LandingPage = () => {
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(location.pathname === "/login");
  const [signupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: 1,
          borderColor: "divider",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Building2
                style={{
                  height: "32px",
                  width: "32px",
                  color: colors.icon,
                }}
              />
              <Typography
                variant="h6"
                component="span"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  color: colors.text,
                }}
              >
                Corporate Culture Community
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Button variant="text" onClick={() => setLoginOpen(true)}>
                Login
              </Button>
              <Login
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                onLogin={() => {
                  setLoginOpen(false);
                  navigate("/locations");
                }}
              />
              <Button variant="contained" onClick={() => setSignupOpen(true)}>
                Apply Now
              </Button>
              <Signup
                open={signupOpen}
                onClose={() => setSignupOpen(false)}
                onSignup={() => {
                  setSignupOpen(false);
                  navigate("/signup/success");
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, textAlign: "center" }}>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Discover Your Next Business Venue
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: colors.textSecondary,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Join an exclusive community of professionals sharing and discovering
          the best venues for meetings, events, and networking. Connect with
          like-minded individuals and elevate your corporate experience.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setSignupOpen(true)}
          >
            Join the Community
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setLoginOpen(true)}
          >
            Member Login
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h2" sx={{ textAlign: "center", mb: 6 }}>
          Why Join Our Community?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: colors.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin style={{ width: 32, height: 32, color: colors.icon }} />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Curated Venues
            </Typography>
            <Typography variant="body2">
              Access a handpicked selection of professional venues perfect for
              your business needs.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: colors.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Users style={{ width: 32, height: 32, color: colors.icon }} />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Community Reviews
            </Typography>
            <Typography variant="body2">
              Read authentic experiences from fellow professionals to make
              informed decisions.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: colors.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Star style={{ width: 32, height: 32, color: colors.icon }} />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Share & Contribute
            </Typography>
            <Typography variant="body2">
              Add your favorite venues and share your experiences to help the
              community grow.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { Mail, Linkedin, Twitter } from "lucide-react";
import logo from "../assets/ccc-logo.png";

const linkStyle = {
  fontSize: "0.875rem",
  color: "text.secondary",
  textDecoration: "none",
  transition: "color 200ms ease",
  "&:hover": { color: "primary.main" },
};
export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "rgba(139, 0, 255, 0.05)",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container sx={{ px: 4, py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 4,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              component="img"
              src={logo}
              alt="Corporate Culture Community"
              sx={{
                height: 64,
                width: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              Connecting People & Culture professionals worldwide.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Community</Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <li>
                <MuiLink href="#" sx={linkStyle}>
                  About Us
                </MuiLink>
              </li>
              <li>
                <MuiLink href="#" sx={linkStyle}>
                  Events
                </MuiLink>
              </li>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Resources</Typography>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                p: 0,
                m: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <li>
                <MuiLink href="#" sx={linkStyle}>
                  Imprint
                </MuiLink>
              </li>
              <li>
                <MuiLink href="#" sx={linkStyle}>
                  Data Privacy
                </MuiLink>
              </li>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Connect</Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <MuiLink
                href="#"
                sx={{
                  color: "text.primary",
                  transition: "color 200ms ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Linkedin style={{ width: 20, height: 20 }} />
              </MuiLink>
              <MuiLink
                href="#"
                sx={{
                  color: "text.primary",
                  transition: "color 200ms ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Twitter style={{ width: 20, height: 20 }} />
              </MuiLink>
              <MuiLink
                href="#"
                sx={{
                  color: "text.primary",
                  transition: "color 200ms ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <Mail style={{ width: 20, height: 20 }} />
              </MuiLink>
            </Box>
            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              Stay updated with our newsletter
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            &copy; {new Date().getFullYear()} Corporate Culture Community. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

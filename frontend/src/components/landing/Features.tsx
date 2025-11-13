import { Users, BookOpen, Calendar } from "lucide-react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

const features = [
  {
    icon: Users,
    title: "Connect & Exchange",
    description:
      "Network with fellow Office, Workplace, and HR Managers. Share experiences, discuss challenges, and build lasting professional relationships with peers who understand your world.",
  },
  {
    icon: BookOpen,
    title: "Share & Learn",
    description:
      "Access our comprehensive knowledge base filled with curated books, KPIs, best practices, and industry insights. Contribute your own learnings and grow collectively.",
  },
  {
    icon: Calendar,
    title: "Event Marketplace",
    description:
      "Discover and participate in exclusive community events, workshops, and networking opportunities. From virtual meetups to in-person conferences, stay connected and informed.",
  },
];

export const Features = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 12,
        background:
          "linear-gradient(to bottom, #FFFFFF, rgba(139, 0, 255, 0.05))",
      }}
    >
      <Container sx={{ px: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem", lg: "3rem" },
              fontWeight: "bold",
              letterSpacing: "-0.025em",
            }}
          >
            What We Offer
          </Typography>
          <Typography
            sx={{
              fontSize: "1.125rem",
              color: "text.secondary",
              maxWidth: "42rem",
              mx: "auto",
            }}
          >
            Three pillars that make our community the go-to platform for People
            & Culture professionals
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            maxWidth: "72rem",
            mx: "auto",
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                sx={{
                  border: "2px solid",
                  borderColor: "divider",
                  transition: "all 300ms ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, rgba(74, 29, 140, 0.1), rgba(139, 0, 255, 0.05))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon style={{ width: 28, height: 28, color: "#4A1D8C" }} />
                  </Box>
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.625,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

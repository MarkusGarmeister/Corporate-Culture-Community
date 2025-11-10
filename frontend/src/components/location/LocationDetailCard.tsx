import {
  Container,
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Star, MessageSquare, MapPin, User } from "lucide-react";
import { useState } from "react";
import { useRecordContext } from "react-admin";
import { Location } from "../../types";
import { colors } from "../../theme";
import { ShareExperienceDialog } from "../ShareExperience";
import { Header } from "../Header";
import { BackToMarket } from "../BackToMarket";

export const LocationDetailCard = () => {
  const record = useRecordContext<Location>();
  const [shareExpOpen, setShareExpOpen] = useState(false);
  const defaultImage =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600";
  const venueExperiences = [
    {
      id: 1,
      userName: "John Doe",
      createdAt: "2024-01-15",
      rating: 4.5,
      comment:
        "Great space for focused work. The WiFi is fast and the coffee is excellent!",
    },
  ];
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 1200, px: { xs: 2, sm: 3 } }}>
          <Header backButton={<BackToMarket />} />
        </Box>
      </Box>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          py: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Card
          sx={{
            maxWidth: 1200,
            mx: "auto",
            boxShadow: 2,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Hero Image Box */}
          <CardMedia
            component="img"
            height="400"
            image={defaultImage}
            alt="location"
          />
          <Box sx={{ p: 8, display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Title and Basic Info */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h2"
                sx={{ fontSize: "2.25rem", fontWeight: 400 }}
              >
                {record?.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Star
                    size={20}
                    style={{ fill: "#facc15", color: "#facc15" }}
                  />
                  <Typography variant="body1" sx={{ fontSize: "1.125rem" }}>
                    {record?.final_rating} Rating
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <MessageSquare size={20} style={{ color: "#6b7280" }} />
                  <Typography sx={{ color: "text.secondary" }}>
                    10 Experiences
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <MapPin size={20} style={{ color: "#6b7280" }} />
                <Typography sx={{ color: "text.secondary" }}>
                  {record?.address_line_1}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontSize: "1.5rem", fontWeight: 500 }}
              >
                About This Venue
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
                Modern coworking space with high-speed internet, meeting rooms,
                and a vibrant community atmosphere.odern coworking space with
                high-speed internet, meeting rooms, and a vibrant community
                atmosphere.odern coworking space with high-speed internet,
                meeting rooms, and a vibrant community atmosphere.odern
                coworking space with high-speed internet, meeting rooms, and a
                vibrant community atmosphere.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pt: 2,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <User size={16} style={{ color: "#6b7280" }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Added by {record?.created_by || "Unknown"}
              </Typography>
            </Box>
            <Button
              onClick={() => setShareExpOpen(true)}
              fullWidth
              size="large"
              variant="contained"
              startIcon={<MessageSquare size={20} />}
              sx={{
                backgroundColor: colors.primary,
                color: colors.ctaText,
                "&:hover": {
                  backgroundColor: colors.primary,
                  opacity: 0.9,
                },
              }}
            >
              Share Your Experience
            </Button>
            <ShareExperienceDialog
              open={shareExpOpen}
              onClose={() => setShareExpOpen(false)}
              onShare={() => console.log("API call to /ratings")}
            />
            {/* Community Experiences */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                pt: 8,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: "1.5rem", fontWeight: 500 }}
              >
                Community Experiences
              </Typography>

              {venueExperiences.length > 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {venueExperiences.map((exp) => (
                    <Card
                      key={exp.id}
                      variant="outlined"
                      sx={{
                        p: 6,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        "&:hover": {
                          boxShadow: 2,
                        },
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              backgroundColor: "grey.200",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <User size={20} style={{ color: "#6b7280" }} />
                          </Box>
                          <Box>
                            <Typography>{exp.userName}</Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {new Date(exp.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Star
                            size={20}
                            style={{ fill: "#facc15", color: "#facc15" }}
                          />
                          <Typography>{exp.rating}</Typography>
                        </Box>
                      </Box>
                      <Typography
                        sx={{ color: "text.secondary", lineHeight: 1.75 }}
                      >
                        {exp.comment}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 12,
                    backgroundColor: "grey.50",
                    borderRadius: 2,
                  }}
                >
                  <MessageSquare
                    size={48}
                    style={{ color: "#9ca3af", margin: "0 auto 12px" }}
                  />
                  <Typography sx={{ color: "text.secondary", mb: 4 }}>
                    No experiences yet. Be the first to share yours!
                  </Typography>
                  <Button
                    onClick={() => console.log("TODO: onShareExperience")}
                    variant="outlined"
                  >
                    Share First Experience
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

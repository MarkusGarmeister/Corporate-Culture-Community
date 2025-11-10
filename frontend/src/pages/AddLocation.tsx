import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  TextField,
} from "@mui/material";
import { Building2, MapPin, FileText, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "../theme";
import { useState } from "react";
import { Header } from "../components/Header";
import { BackToMarket } from "../components/backToMarket";

export const AddLocation = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "lg", px: { xs: 2, sm: 3 } }}>
          <Header backButton={<BackToMarket />} />
        </Box>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ py: 8, px: 4 }}>
        {/* Hero Section */}
        <Card sx={{ p: 8, mb: 6, boxShadow: 1 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
                backgroundColor: colors.iconBg,
              }}
            >
              <Building2 size={32} style={{ color: colors.icon }} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: "2.25rem", mb: 3 }}>
              Add New Venue
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.25rem", color: "text.secondary" }}
            >
              Share a great venue with the community. Add details to help others
              discover it.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={() => console.log("api to backend")}
            sx={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            {/* Venue Name */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Building2 size={16} style={{ color: colors.icon }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Venue Name
                </Typography>
              </Box>
              <TextField
                id="name"
                fullWidth
                placeholder="The Hub Coworking"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                InputProps={{ sx: { fontSize: "1.125rem" } }}
              />
            </Box>

            {/* Description */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <FileText size={16} style={{ color: colors.icon }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Description
                </Typography>
              </Box>
              <TextField
                id="description"
                fullWidth
                multiline
                rows={6}
                placeholder="Describe the venue, its atmosphere, and what makes it special..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                Help others understand what makes this venue unique and worth
                visiting.
              </Typography>
            </Box>

            {/* Address */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <MapPin size={16} style={{ color: colors.icon }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Address
                </Typography>
              </Box>
              <TextField
                id="address"
                fullWidth
                placeholder="123 Main Street, City, State, ZIP"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </Box>

            {/* Image URL */}
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <ImageIcon size={16} style={{ color: colors.icon }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Image URL (optional)
                </Typography>
              </Box>
              <TextField
                id="imageUrl"
                type="url"
                fullWidth
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                Add a photo URL to help showcase the venue. If left empty, a
                default image will be used.
              </Typography>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 4,
                pt: 6,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("locations")}
                fullWidth
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  backgroundColor: colors.primary,
                  color: colors.ctaText,
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.9,
                  },
                }}
              >
                Add Venue
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Help Text */}
        <Card sx={{ p: 6, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Tips for adding a great venue
          </Typography>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              p: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "start",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", mt: 0.5 }}>•</Typography>
              <Typography>
                Be specific and detailed in your description to help others
                understand what makes this venue special
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "start",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", mt: 0.5 }}>•</Typography>
              <Typography>
                Include the full address so community members can easily find
                the location
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "start",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", mt: 0.5 }}>•</Typography>
              <Typography>
                Choose an appropriate category to help others filter and
                discover the venue
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "start",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <Typography sx={{ fontSize: "1.125rem", mt: 0.5 }}>•</Typography>
              <Typography>
                Add a high-quality image that represents the venue well
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Star, People, LocationOn } from "@mui/icons-material";
import { Location } from "../types";

interface VenueCardProps {
  location: Location;
  onClick?: () => void;
}

export const VenueCard = ({ location, onClick }: VenueCardProps) => {
  const priceDisplay = "€".repeat(2);
  const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600";

  return (
    <Card sx={{ maxWidth: 345, height: "100%", cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      {/* Venue Image */}
      <CardMedia
        component="img"
        height="200"
        image={defaultImage}
        alt={location.name}
      />

      <CardContent>
        {/* Venue Name */}
        <Typography gutterBottom variant="h6" component="div">
          {location.name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {location.city}, {location.state}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Star sx={{ fontSize: 16, mr: 0.5, color: "gold" }} />
          <Typography variant="body2" color="text.secondary">
            {location.final_rating?.toFixed(1) || "N/A"} / 5.0
          </Typography>
        </Box>

        {/* Address */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {location.address_line_1}
          {location.address_line_2 && `, ${location.address_line_2}`}
        </Typography>

        {/* Bottom Info: Price, Capacity, and Status */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Chip label={priceDisplay} color="primary" size="small" />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <People sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">{location.capacity} people</Typography>
          </Box>
        </Box>
        <Chip label={location.status} size="small" variant="outlined" />
      </CardContent>
    </Card>
  );
};

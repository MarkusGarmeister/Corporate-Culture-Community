import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { Star, People, LocationOn } from "@mui/icons-material";
import { Venue } from "../types";

interface VenueCardProps {
  venue: Venue;
  // TODO onClick() should open the detailed page
}

export const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      {/* Venue Image */}
      <CardMedia
        component="img"
        height="200"
        image={venue.image}
        alt={venue.name}
      />

      <CardContent>
        {/* Venue Name */}
        <Typography gutterBottom variant="h6" component="div">
          {venue.name}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {venue.city}
          </Typography>
        </Box>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Star sx={{ fontSize: 16, mr: 0.5, color: "gold" }} />
          <Typography variant="body2" color="text.secondary">
            {venue.rating} / 5.0
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {venue.description.length > 100
            ? `${venue.description.substring(0, 100)}...`
            : venue.description}
        </Typography>

        {/* Bottom Info: Price and Capacity */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip label={venue.priceRange} color="primary" size="small" />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <People sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="body2">{venue.capacity} people</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

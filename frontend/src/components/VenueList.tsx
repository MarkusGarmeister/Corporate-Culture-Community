import { Grid, Container, Typography, Box } from "@mui/material";
import { VenueCard } from "./VenueCard";
import { mockVenues } from "../types";

export const VenueList = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Venue Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find the perfect venue for your corporate events
        </Typography>
      </Box>

      {/* Venue Cards Grid */}
      <Grid container spacing={3}>
        {mockVenues.map((venue) => (
          <Grid>
            <VenueCard
              venue={venue}
              onClick={() => console.log("Clicked:", venue.name)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

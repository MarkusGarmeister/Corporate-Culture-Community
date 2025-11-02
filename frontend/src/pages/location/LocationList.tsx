import { List, useListContext } from "react-admin";
import { Box } from "@mui/material";
import { VenueCard } from "../../components/VenueCard";
import { Location } from "../../types";
import { useNavigate } from "react-router-dom";

const LocationGrid = () => {
  const { data, isLoading } = useListContext();
  const navigate = useNavigate();

  if (isLoading || !data) return null;

  const locations = data as Location[];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        mt: 1,
      }}
    >
      {locations.map((location) => (
        <VenueCard
          key={location.id}
          location={location}
          onClick={() => navigate(`/locations/${location.id}/show`)}
        />
      ))}
    </Box>
  );
};

export const LocationList = () => (
  <List>
    <LocationGrid />
  </List>
);

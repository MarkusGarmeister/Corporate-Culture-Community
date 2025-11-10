import { List, useListContext } from "react-admin";
import { Box, AppBar, Button } from "@mui/material";
import { LocationCard } from "../../components/location/LocationCard";
import { Location } from "../../types";
import { useNavigate } from "react-router-dom";
import { SearchAndFilters } from "../../components/marketplace/SearchAndFilters";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "../../components/Header";

const LocationGrid = () => {
  const { data, isLoading } = useListContext();
  const navigate = useNavigate();

  if (isLoading || !data) return null;

  const locations = data as Location[];

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", py: 3 }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          px: 8,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            rowGap: 6,
            columnGap: 6,
          }}
        >
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => navigate(`/locations/${location.id}/show`)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const LocationList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  return (
    <List
      actions={false}
      sx={{
        width: "100%",
        "& .RaList-main": {
          margin: 0,
          padding: 0,
          width: "100%",
        },
        "& .RaList-content": {
          padding: 0,
          margin: 0,
          width: "100%",
        },
      }}
    >
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
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "1400px",
              px: 8,
            }}
          >
            <Header />
            <Box sx={{ marginBottom: "32px" }}>
              <SearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => navigate("create")}
                sx={{ whiteSpace: "nowrap" }}
              >
                Add Venue
              </Button>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <LocationGrid />
    </List>
  );
};

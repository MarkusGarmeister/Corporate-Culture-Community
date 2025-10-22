import { Grid, Container, Typography, Box, Pagination } from "@mui/material";
import { VenueCard } from "./VenueCard";
import { mockVenues } from "../types";
import { useState, useEffect } from "react";
import { VenueFilter, FilterState } from "./VenueFilter";

export const VenueList = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchWord: "",
    city: "",
    capacityRange: "",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 6;

  const uniqueCities = Array.from(
    new Set(mockVenues.map((v) => v.city)),
  ).sort();

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch =
      filters.searchWord === "" ||
      venue.name.toLowerCase().includes(filters.searchWord.toLowerCase()) ||
      venue.description
        .toLowerCase()
        .includes(filters.searchWord.toLowerCase());
    const matchesCity = filters.city === "" || venue.city === filters.city;

    let matchesCapacity = true;
    if (filters.capacityRange === "small")
      matchesCapacity = venue.capacity <= 25;
    if (filters.capacityRange === "medium")
      matchesCapacity = venue.capacity > 25 && venue.capacity <= 50;
    if (filters.capacityRange === "large")
      matchesCapacity = venue.capacity > 50 && venue.capacity <= 100;
    if (filters.capacityRange === "xlarge")
      matchesCapacity = venue.capacity > 100;

    let matchesPrice = true;
    if (filters.priceRange !== "") {
      const minPrice = parseInt(venue.priceRange.match(/\d+/)?.[0] || "0");
      if (filters.priceRange === "budget") matchesPrice = minPrice < 150;
      if (filters.priceRange === "midrange")
        matchesPrice = minPrice >= 150 && minPrice < 300;
      if (filters.priceRange === "premium") matchesPrice = minPrice >= 300;
    }

    return matchesSearch && matchesCity && matchesCapacity && matchesPrice;
  });
  const startIndex = (currentPage - 1) * venuesPerPage;
  const endIndex = startIndex + venuesPerPage;
  const shownVenues = filteredVenues.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

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
      <VenueFilter
        filters={filters}
        onFilterChange={setFilters}
        cities={uniqueCities}
      />

      {/* Venue Cards Grid */}
      <Grid container spacing={3}>
        {shownVenues.map((venue) => (
          <Grid key={venue.id}>
            <VenueCard
              venue={venue}
              onClick={() => console.log("Clicked:", venue.name)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          shape="rounded"
          onChange={(event, page) => setCurrentPage(page)}
        ></Pagination>
      </Box>
    </Container>
  );
};

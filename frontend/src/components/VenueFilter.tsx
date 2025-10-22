import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export interface FilterState {
  searchWord: string;
  city: string;
  capacityRange: string;
  priceRange: string;
}

interface VenueFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  cities: string[];
}
export const VenueFilter = ({
  filters,
  onFilterChange,
  cities,
}: VenueFilterProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      searchWord: event.target.value,
    });
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      city: event.target.value,
    });
  };

  const handleCapacityChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      capacityRange: event.target.value,
    });
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      priceRange: event.target.value,
    });
  };
  return (
    <Paper elevation={2} sx={{ mb: 3, p: 2.5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Search Bar - Full Width */}
        <TextField
          fullWidth
          placeholder="Search venues by name or description..."
          value={filters.searchWord}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Filter Dropdowns Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {/* City Filter */}
          <FormControl sx={{ minWidth: 150, flex: 1 }}>
            <InputLabel>City</InputLabel>
            <Select
              value={filters.city}
              onChange={handleCityChange}
              label="City"
            >
              <MenuItem value="">All Cities</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Capacity Filter */}
          <FormControl sx={{ minWidth: 150, flex: 1 }}>
            <InputLabel>Capacity</InputLabel>
            <Select
              value={filters.capacityRange}
              onChange={handleCapacityChange}
              label="Capacity"
            >
              <MenuItem value="">Any Capacity</MenuItem>
              <MenuItem value="small">Small (up to 25)</MenuItem>
              <MenuItem value="medium">Medium (25-50)</MenuItem>
              <MenuItem value="large">Large (50-100)</MenuItem>
              <MenuItem value="xlarge">Extra Large (100+)</MenuItem>
            </Select>
          </FormControl>

          {/* Price Filter */}
          <FormControl sx={{ minWidth: 150, flex: 1 }}>
            <InputLabel>Price Range</InputLabel>
            <Select
              value={filters.priceRange}
              onChange={handlePriceChange}
              label="Price Range"
            >
              <MenuItem value="">Any Price</MenuItem>
              <MenuItem value="budget">Budget (€0-150)</MenuItem>
              <MenuItem value="midrange">Mid-range (€150-300)</MenuItem>
              <MenuItem value="premium">Premium (€300+)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Paper>
  );
};

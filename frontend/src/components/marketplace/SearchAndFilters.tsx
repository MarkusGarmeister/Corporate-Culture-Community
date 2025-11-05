import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
}: SearchAndFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Search venues by name, city, or address..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

import { Box, Container, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "white",
        py: 4,
        mt: 10,
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 Corporate Culture Community. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

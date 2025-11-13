import { Box, Container, Typography } from "@mui/material";

export const Events = () => {
  return (
    <Box
      component="section"
      id="events"
      sx={{
        py: 6,
        background:
          "linear-gradient(to bottom right, rgba(139, 0, 255, 0.08), #FFFFFF, rgba(139, 0, 255, 0.05))",
      }}
    >
      <Container sx={{ px: 4 }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.25rem", lg: "3rem" },
              fontWeight: "bold",
              letterSpacing: "-0.025em",
            }}
          >
            Upcoming Events
          </Typography>
          <Typography
            sx={{
              fontSize: "1.125rem",
              color: "text.secondary",
              maxWidth: "42rem",
              mx: "auto",
            }}
          >
            Join us for upcoming community events, workshops, and networking
            opportunities
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="iframe"
            src="https://luma.com/embed/calendar/cal-Nm1QAck0miG5bdB/events"
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "450px",
              border: "1px solid #bfcbda88",
              borderRadius: "4px",
            }}
            allowFullScreen
            tabIndex={0}
          />
        </Box>
      </Container>
    </Box>
  );
};

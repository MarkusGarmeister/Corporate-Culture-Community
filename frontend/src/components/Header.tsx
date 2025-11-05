import { Toolbar, Box, Typography, Button } from "@mui/material";
import { Building2, LogOut, User } from "lucide-react";
import { colors } from "../theme";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Toolbar
      disableGutters
      sx={{
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Building2
          style={{
            height: "32px",
            width: "32px",
            color: colors.icon,
          }}
        />
        <Typography
          variant="h6"
          component="span"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 400,
            color: colors.text,
          }}
        >
          Corporate Culture Community
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Welcome, Max Mustermann
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<User size={20} />}
          onClick={() => navigate("/users/1/show")}
        >
          Profile
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={<LogOut size={20} />}
        >
          Logout
        </Button>
      </Box>
    </Toolbar>
  );
};

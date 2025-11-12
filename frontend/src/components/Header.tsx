import { Toolbar, Box, Typography, Button } from "@mui/material";
import { LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useGetIdentity, useGetOne } from "react-admin";
import logo from "../assets/ccc-logo.png";

export const Header = ({ backButton }: { backButton?: React.ReactNode }) => {
  const { data: userId } = useGetIdentity();
  const { data: user } = useGetOne("users", { id: userId?.id });
  const location = useLocation();
  const navigate = useNavigate();
  const onProfilePage =
    location.pathname.includes("/users/") &&
    location.pathname.includes("/show");
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
      <Box sx={{ display: "flex", alignItems: "column", gap: 1 }}>
        {backButton}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="CCC Logo"
            sx={{
              height: "80px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Welcome, {user?.first_name} {user?.last_name}
        </Typography>
        {!onProfilePage && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<User size={20} />}
            onClick={() => navigate(`/users/${userId?.id}/show`)}
          >
            Profile
          </Button>
        )}

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

import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";

export const BackToMarket = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/locations");
  };
  return (
    <Button
      variant="text"
      startIcon={<ArrowLeft size={16} />}
      onClick={onBack}
      sx={{ color: "text.primary" }}
    >
      Back to Marketplace
    </Button>
  );
};

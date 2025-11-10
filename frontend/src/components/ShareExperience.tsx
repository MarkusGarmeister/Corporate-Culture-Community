import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Star } from "lucide-react";

interface ShareExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  onShare: (rating: number, comment: string) => void;
}

export function ShareExperienceDialog({
  open,
  onClose,
  onShare,
}: ShareExperienceDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(rating, comment);
    setRating(0);
    setHoveredRating(0);
    setComment("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share Your Experience</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Tell the community about your experience at Venue Name
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Rating Section */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Rating
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    sx={{
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Star
                      size={32}
                      style={{
                        fill:
                          star <= (hoveredRating || rating)
                            ? "#facc15"
                            : "transparent",
                        color:
                          star <= (hoveredRating || rating)
                            ? "#facc15"
                            : "#d1d5db",
                      }}
                    />
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Comment Section */}
            <Box>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Your Experience"
                placeholder="Share your thoughts about this venue..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            fullWidth
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={rating === 0}
            sx={{ flex: 1 }}
          >
            Share Experience
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

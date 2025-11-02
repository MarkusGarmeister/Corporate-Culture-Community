import { Rating } from "../types/index";
import { Rating as RatingStars } from "@mui/material";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export const RatingSection = ({ locationId }: { locationId: number }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/ratings/?location_id=${locationId}`,
      );
      setRatings(response.data);
    } catch (error) {
      console.log("Failed to get ratings", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRatings();
  }, [locationId]);
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/ratings/", {
        location_id: locationId,
        rating: ratingValue,
        comment: `${comment}`,
      });
      setComment("");
      setRatingValue(0);
      fetchRatings();
    } catch (error) {
      console.log("Failed to submit:", error);
      console.log("Error details:", error.response?.data);
    }
  };

  return (
    <Box>
      <Typography>Reviews</Typography>
      {ratings.map((rating) => (
        <Box key={rating.id}>
          <RatingStars
            readOnly
            size="small"
            value={rating.rating}
          ></RatingStars>
          <TextField variant="outlined" value={rating.comment}></TextField>
        </Box>
      ))}
      <Box>
        <Typography>Tell us about your experience?</Typography>
        <RatingStars
          name="half-read"
          value={ratingValue}
          onChange={(e, newValue) => setRatingValue(newValue || 0)}
        />
        <TextField
          id="filled-multiline-static"
          label="Your Comment"
          multiline
          rows={5}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

import {Rating} from "../types/index"
import { Rating as RatingStars } from "@mui/material"
import { TextField, Button, Box, Typography} from "@mui/material"
import { useState } from "react"
import axios from "axios"



export const RatingSection = ({ locationId }: { 
    locationId: number
  }) => {
    const [ratingValue, setRatingValue] = useState<number>(0)
    const [comment, setComment] = useState<string>("")
    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8000/ratings", {"location_id": locationId, "rating": ratingValue, "comment": `${comment}`})
            setComment("")
            setRatingValue(0)
        } catch (error) {
            console.log("Failed to submit:", error)
        }
    }
    return(
        <Box>
            <Typography>Ratings</Typography>
            <RatingStars name="half-rating" value={ratingValue} onChange={(e, newValue) => setRatingValue(newValue || 0)} precision={0.5} />
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
        
    )
}
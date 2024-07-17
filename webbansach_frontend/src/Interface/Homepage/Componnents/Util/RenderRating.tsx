import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
interface RenderRatingInterface {
  rating: number;
}
const RenderRating: React.FC<RenderRatingInterface> = ({ rating }) => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 0 },
      }}
    >
      {/* <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> */}
      {/* <Typography component="legend">Read only</Typography> */}
      <Rating name="read-only" value={rating} readOnly />
      {/* <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
};
export default RenderRating;

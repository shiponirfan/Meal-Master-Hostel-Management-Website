import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Rating, Stack } from "@mui/material";
import { Link } from "react-router-dom";
export default function MealsCategoryCard({ meal }) {
  const { _id, mealTitle, mealImage, price, rating } = meal;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={mealImage} title={mealTitle} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" fontWeight={600}>
          {mealTitle}
        </Typography>

        <Stack direction={"row"} alignItems={"center"} spacing={0.8}>
          <Typography variant="h6" component="h3" fontWeight={600}>
            Price:
          </Typography>
          <Typography variant="h6" component="span">
            ${price}
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={0.8}>
          <Typography variant="h6" component="h3" fontWeight={600}>
            Rating:
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
        </Stack>
        <Link to={`/meal/${_id}`}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: 18,
              fontWeight: "700",
              mt: 1,
            }}
          >
            Show Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

MealsCategoryCard.propTypes = {
  meal: PropTypes.object,
};

import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const HeadingTitle = ({ titleOne, titleSecond, desc }) => {
  return (
    <Stack sx={{ mb: 5, alignItems: "center" }}>
      <Typography
        className="norican"
        variant="h1"
        fontWeight={700}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          mb: 1,
        }}
      >
        {titleOne}
        <Typography
          className="norican"
          variant="h1"
          component="span"
          fontWeight={700}
          color={"primary"}
        >
          {titleSecond}
        </Typography>
      </Typography>
      <Typography variant="body1">{desc}</Typography>
    </Stack>
  );
};
HeadingTitle.propTypes = {
  titleOne: PropTypes.string,
  titleSecond: PropTypes.string,
  desc: PropTypes.string,
};

export default HeadingTitle;

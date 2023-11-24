import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PropTypes from "prop-types";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f77f00",
    },
    secondary: {
      main: "#d62828",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
const Themes = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Themes.propTypes = {
  children: PropTypes.node,
};

export default Themes;

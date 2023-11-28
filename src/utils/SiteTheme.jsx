import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PropTypes from "prop-types";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f77f00",
    },
    secondary: {
      main: "#e85d04",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});
const SiteTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

SiteTheme.propTypes = {
  children: PropTypes.node,
};

export default SiteTheme;

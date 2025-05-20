import { createTheme } from "@mui/material/styles";

export const backgroundColor = "#EEE1D4";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f7bc97",
    },
    secondary: {
      main: "#97dff7",
    },
    background: {
      default: backgroundColor,
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
});

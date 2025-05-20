import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.ts";
import { CssBaseline, GlobalStyles } from "@mui/material";
import App from "./App.tsx";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        margin: 0,
        padding: 0,
        border: 0,
        boxSizing: "border-box",
      },
      body: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
      },
    }}
  />
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <App />
    </ThemeProvider>
  </StrictMode>
);

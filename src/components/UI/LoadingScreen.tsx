import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <DotLottieReact
        src="/loading.json"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </Box>
  );
};

export default LoadingScreen;

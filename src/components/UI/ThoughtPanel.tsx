import { useAppStore } from "../../stores/useAppStore";
import { Box, Paper, Typography } from "@mui/material";

const ThoughtPanel = () => {
  const shouldRotate = useAppStore((state) => state.shouldRotate);
  const selectedThoughtData = useAppStore((state) => state.selectedThoughtData);

  if (shouldRotate || !selectedThoughtData) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
      sx={{ pointerEvents: "auto", color: "#000" }} // ensure it can be interacted with
    >
      <Paper
        elevation={0}
        sx={{ padding: 4, minWidth: 300, bgcolor: "#ffffffc9" }}
      >
        <Typography variant="h6" gutterBottom>
          Thought Blob
        </Typography>
        <Typography>
          {" "}
          {selectedThoughtData
            ? selectedThoughtData.description
            : "No infomation"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ThoughtPanel;

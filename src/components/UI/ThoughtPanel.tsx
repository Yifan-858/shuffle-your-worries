import { useAppStore } from "../../stores/useAppStore";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
// import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

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
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            minWidth: 300,
            bgcolor: "#ffffff6d",
            backdropFilter: "blur(10px)",
            border: "solid 1px #ffffff64",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ userSelect: "none" }}>
            Thought Blob
          </Typography>
          <Typography sx={{ userSelect: "none" }}>
            {" "}
            {selectedThoughtData
              ? selectedThoughtData.description
              : "No infomation"}
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ThoughtPanel;

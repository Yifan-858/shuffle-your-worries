import { useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { TextField, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const InputForm = () => {
  const { addThoughtFromInput } = useAppStore();
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    addThoughtFromInput(input.trim());
    setInput("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a thought..."
          sx={{ mr: 1, width: 250, p: 1 }}
        />
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </Box>

      {/* Text outside the input box */}
      <Typography
        variant="caption"
        sx={{
          userSelect: "none",
          mt: 2,
          fontSize: "0.75rem",
          color: "gray",
          position: "absolute",
          bottom: 60,
        }}
      >
        Click on the model to see the info
      </Typography>
    </Box>
  );
};

export default InputForm;

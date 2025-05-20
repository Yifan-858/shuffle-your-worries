import { useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { TextField, IconButton, Box } from "@mui/material";
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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        p: 1,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a thought..."
        sx={{ mr: 1, width: 250 }}
      />
      <IconButton type="submit" color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default InputForm;

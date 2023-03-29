import useCreatePost from "@/hooks/useCreatePost";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

const CreatePost = () => {
  const { form, handleSubmit } = useCreatePost();
  const [status, setStatus] = useState("publish");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
        bgcolor: "rgba(254, 252, 252, 0.765)",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          p: 5,
          width: { xs: "98%", md: "40%" },
          borderRadius: "10px",
        }}
      >
        <Box>
          <TextField
            fullWidth
            label="title"
            {...form.register("title")}
            sx={{
              color: "white",
              border: "white",
              bgcolor: "rgba(181, 181, 181, 0.765)",
            }}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={{
              color: "white",
              border: "white",
              bgcolor: "rgba(181, 181, 181, 0.765)",
            }}
            label="content"
            {...form.register("content")}
            fullWidth
            id="outlined-basic"
            variant="outlined"
          />
        </Box>

        <Box>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <FormControl fullWidth>
            <Select
              {...form.register("status")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={"publish"}>Publish</MenuItem>
              <MenuItem value={"no-Published"}>Not Published</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button type="submit" color="info" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePost;

import useCreatePost from "@/hooks/useCreatePost";
import {
  Box,
  Button,
  FormControl,
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
        height: "100%",
        flexDirection: "column",
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
          width: { xs: "98%", md: "50%" },
          background: "#c7cacb",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="black" variant="h3">
            Create form
          </Typography>
        </Box>
        <Box>
          <Typography color="black" mb={1}>
            Title
          </Typography>
          <TextField
            fullWidth
            {...form.register("title")}
            sx={{
              color: "white",
              border: "white",
            }}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography color="black" mb={1}>
            Content
          </Typography>
          <TextField
            fullWidth
            maxLength={12}
            inputProps={{
              style: {
                height: "100px",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
              },
            }}
            {...form.register("content")}
            id="outlined-basic"
            variant="outlined"
          />
        </Box>

        <Box>
          <Typography color="black" mb={1}>
            Status
          </Typography>
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

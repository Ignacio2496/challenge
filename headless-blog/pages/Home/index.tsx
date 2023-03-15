import NavBar from "@/Componenets/Navbar";
import JimmyHendrixIcon from "@/public/Icons/JimmyHendrix";
import { Box, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Typography variant="h3">This blog is about GUITARS</Typography>
      </Box>
    </Box>
  );
};

export default Home;

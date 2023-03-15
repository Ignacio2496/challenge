import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 10,
      }}
    >
      <Box>
        <Link href={"/blog"}>
          <Typography color="black">BLOG</Typography>
        </Link>
      </Box>
      <Box>
        <Link href={"/tuvieja"}>
          <Typography color="black">Information</Typography>
        </Link>
      </Box>
      <Box>
        <Link href={"/tuvieja"}>
          <Typography color="black">About me</Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default NavBar;

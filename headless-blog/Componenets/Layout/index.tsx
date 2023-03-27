import { Box } from "@mui/material";
import { useRouter } from "next/router";
import path from "path";
import React from "react";
import NavBar from "../Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();
  if (pathname === "/") return <>{children}</>;

  return (
    <Box>
      <NavBar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;

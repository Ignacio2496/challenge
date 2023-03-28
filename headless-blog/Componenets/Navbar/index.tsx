import { useAuthContext } from "@/context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NavBar = () => {
  const { push } = useRouter();

  const logoutCookie = () => {
    deleteCookie("userToken");
    push("/");
  };

  return (
    <Box
      sx={{
        bgcolor: "grey",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        p: 2,
      }}
    >
      <Box>
        <Link href={"/create"}>
          <Button>
            <Typography color="black">Create</Typography>
          </Button>
        </Link>
      </Box>
      <Box>
        <Button>
          <Link href={"/blog"}>
            <Typography color="black">BLOG</Typography>
          </Link>
        </Button>
      </Box>
      <Box>
        <Button>
          <Typography onClick={logoutCookie} color="black">
            LOG OUT
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;

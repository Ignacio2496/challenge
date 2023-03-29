import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FitbitIcon from "@mui/icons-material/Fitbit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMediaQuery } from "@mui/material";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const desktop = useMediaQuery("(min-width:900px)");
  const { push } = useRouter();
  const logoutCookie = () => {
    deleteCookie("userToken");
    push("/");
  };
  return (
    <AppBar
      sx={{
        bgcolor: "rgba(18, 18, 18, 0.56)",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {desktop && (
            <FitbitIcon
              sx={{
                mr: 5,
              }}
            />
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={"create"} onClick={handleCloseNavMenu}>
                <Link href={"/create"}>
                  <Typography textAlign="center">Create</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={"blog"} onClick={handleCloseNavMenu}>
                <Link href={"/blog"}>
                  <Typography textAlign="center">Blog</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={"logout"} onClick={logoutCookie}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href={"/create"}>
              <Button
                key={"create"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Create
              </Button>
            </Link>
            <Link href={"/blog"}>
              <Button
                key={"create"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Blog
              </Button>
            </Link>

            <Button
              key={"create"}
              onClick={logoutCookie}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Log out
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User">
              <AccountCircleIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

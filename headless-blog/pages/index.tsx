import useLogin from "@/hooks/useLogIn";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import LoginImg from "../public/Images/blog.jpg";

import React from "react";
import Image from "next/image";

const LogIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { handleSubmit, isLogInLoading, form } = useLogin();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        height: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            height: "100%",
            backgroundImage: `url("/Images/blog.jpg")`,
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          bgcolor: "rgba(254, 252, 252, 0.765)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: { xs: "90%", sm: "50%" },
            p: 5,
            height: "60%",
            gap: 5,
            borderRadius: "10px",
          }}
        >
          <Typography color="primary" variant="h3">
            Log in
          </Typography>

          <TextField
            disabled={isLogInLoading}
            error={Boolean(form.formState?.errors?.username?.message)}
            helperText={form.formState?.errors?.username?.message}
            {...form.register("username")}
            color="primary"
            fullWidth
            id="standard-basic"
            label="username"
            variant="standard"
          />

          <FormControl
            sx={{
              width: "100%",
            }}
            variant="standard"
          >
            <InputLabel color="primary" htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              {...form.register("password")}
              error={Boolean(form.formState?.errors?.username?.message)}
              color="primary"
              fullWidth
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button color="primary" type="submit" fullWidth variant="contained">
            {isLogInLoading ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <CircularProgress color="inherit" size={18} />
                <Typography>Loading</Typography>
              </Box>
            ) : (
              "Login"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LogIn;

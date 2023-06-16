"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const username = useRef("");
  const password = useRef("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: { lg: "30%", md: "50%", xs: "90%" },
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          p: "2rem",
          border: "1px dashed",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        <Typography variant="h3" textAlign={"center"} under>Sign In</Typography>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-username">Username</InputLabel>
          <OutlinedInput id="outlined-username" type="text" label="Username" />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default SignInPage;

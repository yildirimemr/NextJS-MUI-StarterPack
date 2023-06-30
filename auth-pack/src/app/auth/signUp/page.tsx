"use client";

import RequestBody from "@/utils/interfaces/IUserCreateReqBody";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [hasError, setHaserror] = useState<boolean>(false);
  const fullname = useRef("");
  const username = useRef("");
  const password = useRef("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const setError = (message: string) => {
    setAlertMessage(message);
    setHaserror(true);
    setOpenSnackBar(true);
  };

  const checkSignup = (): boolean => {
    const _fullname = fullname.current;
    if (_fullname === "") {
      setError("Full name cannot be empty!");
      return false;
    }

    const _email = username.current;
    if (_email === "") {
      setError("Email cannot be empty!");
      return false;
    }

    const _password = password.current;
    if (_password === "") {
      setError("Password cannot be empty!");
      return false;
    }

    return true;
  };

  const onSubmit = async (e: any) => {
    if (!checkSignup()) {
      return;
    }

    const requestBody: RequestBody = {
      name: fullname.current,
      email: username.current,
      password: password.current,
    };

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const JsonResponse = await response.json();

    if (JsonResponse) {
      const login: SignInResponse | undefined = await signIn("credentials", {
        username: username.current,
        password: password.current,
        redirect: false,
      });

      if (login) {
        router.push("/");
      } else {
        setError("Something went wrong!");
      }
    } else {
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
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
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            sx={{ textDecoration: "underline" }}
          >
            Sign Up
          </Typography>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-fullname">Full Name</InputLabel>
            <OutlinedInput
              error={hasError}
              id="outlined-fullname"
              type="text"
              label="Full Name"
              onChange={(e) => (fullname.current = e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-username">Email</InputLabel>
            <OutlinedInput
              error={hasError}
              id="outlined-username"
              type="email"
              label="Email"
              onChange={(e) => (username.current = e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              error={hasError}
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
              onChange={(e) => (password.current = e.target.value)}
            />
          </FormControl>
          <Button variant="contained" onClick={onSubmit}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default SignUpPage;

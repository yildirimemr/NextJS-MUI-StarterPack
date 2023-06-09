"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SignInResponse, signIn } from "next-auth/react";
import Link from "next/link";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [hasError, setHaserror] = useState<boolean>(false);
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result: SignInResponse | undefined = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: false,
    });
    if (result) {
      const { error, ok } = result;
      if (ok) {
        const hasError = error !== null;
        if (hasError) {
          setAlertMessage("Username or password is wrong!")
          setHaserror(true);
          setOpenSnackBar(true);
        } else {
          router.push("/");
        }
      } else {
        setAlertMessage("Something went wrong!")
      }
    } else {
      setAlertMessage("Something went wrong!")
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
            border: "1px dashed",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            sx={{ textDecoration: "underline" }}
          >
            Sign In
          </Typography>
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
            Sign in
          </Button>
          <Typography
            variant="body1"
            textAlign={"left"}
            component={Link}
            href={"/auth/signUp"}
            sx={{color:"inherit"}}
          >
            Create an account. 
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default SignInPage;

"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const settings = [
  {
    buttonName: "Profile",
    redirectUrl: "/profile",
  },
];

const SignInOutButton = () => {
  const [hasSession, setHasSession] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      setHasSession(true);
    } else {
      setHasSession(false);
    }
  }, [session]);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOutHandler = async (e: any) => {
    e.preventDefault();
    const result = await signOut({
      redirect: false,
    });
    if (result) {
      router.push("/");
    }
  };

  if (hasSession) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <Typography
            onClick={handleOpenUserMenu}
            variant="h6"
            noWrap
            sx={{
              p: 0,
              "&:hover": { cursor: "pointer" },
            }}
          >
            {session?.user.name}
            <KeyboardArrowDownIcon sx={{ verticalAlign: "middle" }} />
          </Typography>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.buttonName} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => router.push(setting.redirectUrl)}
              >
                {setting.buttonName}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={(e) => signOutHandler(e)}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button variant="outlined" onClick={() => router.push("/auth/signIn")}>
        Sign in
      </Button>
    </Box>
  );
};

export default SignInOutButton;

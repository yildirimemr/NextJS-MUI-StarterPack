"use client";

import React, { FC, ReactElement } from "react";
import { AppBar, Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <footer style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <AppBar
        position="relative"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">NextJS Starter Pack</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1">
                {`${new Date().getFullYear()} | React | Material UI | React Router`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </footer>
  );
};

export default Footer;

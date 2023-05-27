"use client";

import { Container } from "@mui/material";
import React from "react";

const PageContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <main>
      <Container disableGutters maxWidth={false} sx={{ padding:"2rem" }}>
        {children}
      </Container>
    </main>
  );
};

export default PageContainer;

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        {session.user.name}
        {session.user.email}
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Sign In</button>;
};

export default SignInButton;

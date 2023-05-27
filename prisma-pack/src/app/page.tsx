import React from "react";

const HomePage = () => {
  return (
    <>
      <p>NextJS Prisma Template with MUI</p>
      <br/>
      <h3>Prisma Client example usage:</h3>
      <p>
        import prisma from `@/utils/prisma`;<br/>
        ...<br/>
        const users = await prisma.user.findMany<br/>
      </p>
    </>
  );
};

export default HomePage;

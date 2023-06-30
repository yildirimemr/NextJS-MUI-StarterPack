# NextJS Starter Pack
This repo contains a starter pack using the NextJS App folder with Prisma Database Adapter and Material UI (MUI).

## Getting Started
This project includes three main subprojects.
1. Base Pack ->  Includes implementation of MUI
2. Prisma Pack ->  Includes implementation of MUI and Prisma Adapter
3. Auth Pack ->  Includes implementation of MUI, Prisma Adapter, and AuthJS with basic authentication configrations

## Notes
1. for using css in JSX: 
```
/** @jsxImportSource @emotion/react */
"use client";

export default function Page() {
  return <div css={{ color: "green" }}>something</div>;
}
```
2. The settings in the .env file should be changed.
3. Only Auth Pack project totally uses React Router capabilities. If this is desired to be used in other projects, its implementation must be done.
4. The next-env.d.ts file has been removed from the .gitignore to avoid errors. It can be added again as needed.
## Authors
* **Emre Yıldırım** - [GitHub](https://github.com/yildirimemr)
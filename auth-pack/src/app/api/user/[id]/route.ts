import { verifyJwtAccessToken } from "@/utils/jwt";
import prisma from "@/utils/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const accessToken = request.headers.get("authorization")
  if (!accessToken || !verifyJwtAccessToken(accessToken)){
    return new Response(JSON.stringify(null));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (user) {
    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  }

  return new Response(JSON.stringify(null));
}

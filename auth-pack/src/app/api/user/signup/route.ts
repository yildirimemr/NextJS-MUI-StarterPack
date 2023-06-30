import prisma from "@/utils/prisma";
import * as bcrypt from "bcrypt";
import RequestBody from "@/utils/interfaces/IUserCreateReqBody";

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;

    return new Response(JSON.stringify(result));
  } catch (e) {
    return new Response(JSON.stringify(null));
  }
}

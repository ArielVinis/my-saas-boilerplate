import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { paths } from "@/lib/paths";
import { getCurrentUser } from "@/app/server/auth/users";
import { Role } from "../../prisma/generated/prisma/enums";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const { user } = await getCurrentUser();
  // Ajustar para pegar o role do user
  if (pathname.startsWith(paths.root)) {
    if (user.role !== Role.OWNER || Role.MANAGER) {
      return NextResponse.redirect(paths.auth.login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { paths } from "@/lib/paths";

export async function GET(
  request: NextRequest,
  { params }: { params: { invitationId: string } },
) {
  const { invitationId } = params;

  try {
    await auth.api.acceptInvitation({
      body: { invitationId },
      headers: await headers(),
    });

    return NextResponse.redirect(new URL(paths.root, request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL(paths.auth.login, request.url));
  }
}

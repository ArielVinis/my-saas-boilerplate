import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { lastLoginMethod, organization } from "better-auth/plugins";
import { db } from "@/shared/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  ac,
  ADMIN,
  OWNER,
  MANAGER,
  MEMBER,
  CLIENT,
} from "@/shared/lib/permissions";
import { OrganizationInvitationEmail } from "@/components/emails/organization-invitation";
import { ResetPasswordEmail } from "@/components/emails/reset-password";
import { VerifyEmail } from "@/components/emails/verify-email";
import { Resend } from "resend";
import { getActiveOrganization } from "@/server/organizations/organizations";
import { paths } from "@/shared/constants/paths";

const baseUrl = process.env.BETTER_AUTH_URL as string;
const invitationAcceptUrl = (invitationId: string) =>
  `${baseUrl}${paths.api.acceptInvitation(invitationId)}`;

// Passar para a /lib depois
const resend = new Resend(process.env.RESEND_API_KEY);
const emailNoReply = process.env.EMAIL_NO_REPLY as string;

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),

  trustedOrigins: [baseUrl],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID as string,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET as string,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER as string,
    },
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: emailNoReply,
        to: user.email,
        subject: "Redefina sua senha",
        react: ResetPasswordEmail({
          userName: user.name,
          resetUrl: url,
        }),
      });
    },
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }: { user: User; url: string }) {
      await resend.emails.send({
        from: emailNoReply,
        to: user.email,
        subject: "Verifique seu email",
        react: VerifyEmail({
          userName: user.name,
          verificationUrl: url,
        }),
      });
    },
  },

  plugins: [
    lastLoginMethod(),
    nextCookies(),

    organization({
      ac,
      roles: {
        ADMIN,
        OWNER,
        MANAGER,
        MEMBER,
        CLIENT,
      },
      async sendInvitationEmail(data) {
        const inviteUrl = invitationAcceptUrl(data.id);
        await resend.emails.send({
          from: emailNoReply,
          to: data.email,
          subject: `Convite para a agência ${data.organization.name}`,
          react: OrganizationInvitationEmail({
            inviteUrl,
            inviterName: data.inviter.user.name,
            inviterEmail: data.inviter.user.email,
            organizationName: data.organization.name,
            role: data.role,
          }),
        });
      },
    }),
  ],
});

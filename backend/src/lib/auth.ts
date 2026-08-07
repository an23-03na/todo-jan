import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { sendEmail } from "./send-email";
import { prisma } from "../prisma/prisma-client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.FRONTEND_URL!],
  advanced: {
    cookiePrefix: "auth",
    crossSubDomainCookies: {
      enabled: true,
      domain: ".mk-flower.am",
    },
    useSecureCookies: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {fields: {}},
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    async sendVerificationEmail({ url, user }) {
      await sendEmail({
        to: user.email,
        subject: "Verification",
        html: `<p>Verify : <a href='${url}' style='color:aqua;'>link to verify</a></p>`,
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

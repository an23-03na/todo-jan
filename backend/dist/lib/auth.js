"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
// If your Prisma file is located elsewhere, you can change the path
const send_email_1 = require("./send-email");
const prisma_client_1 = require("../prisma/prisma-client");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma_client_1.prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.FRONTEND_URL],
    advanced: {
        cookiePrefix: "auth",
    },
    emailAndPassword: {
        enabled: true,
    },
    user: { fields: {} },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendVerificationEmail(_a) {
            return __awaiter(this, arguments, void 0, function* ({ url, user }) {
                yield (0, send_email_1.sendEmail)({
                    to: user.email,
                    subject: "Verification",
                    html: `<p>Verify : <a href='${url}' style='color:aqua;'>link to verify</a></p>`,
                });
            });
        },
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },
});

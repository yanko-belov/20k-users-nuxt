import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { database } from "~/server/db";
export default NuxtAuthHandler({
  secret: import.meta.env.NUXT_AUTH_SESSION_SECRET_KEY as string,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: { username: string; password: string }) {
        try {
          return await database.collection("users").findOne({
            email: { $regex: new RegExp(credentials?.username.trim(), "i") },
          });
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});

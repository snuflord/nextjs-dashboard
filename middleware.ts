
// The advantage of employing Middleware for this task is that the protected routes will not even start rendering until the Middleware verifies the authentication, enhancing both the security and performance of the application.
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// initialising nextAuth with aithConfig object, exporting the auth property.
export default NextAuth(authConfig).auth;

export const config =  {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
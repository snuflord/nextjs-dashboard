import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// The Credentials provider allows users to log in with a username and a password.
// Although we're using the Credentials provider, it's generally recommended to use alternative providers such as OAuth or email providers: https://authjs.dev/getting-started/providers
import Credentials from 'next-auth/providers/credentials';

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
    providers: [Credentials({
        
    })],
});
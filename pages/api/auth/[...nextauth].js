import admin from "firebase-admin";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const serviceAccount = require('/huco.json');

// Initialize Firebase app if it hasn't been already
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://huco-9f896-default-rtdb.firebaseio.com",
  });
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user.name
        .split("")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      const db = admin.firestore();
      const userRef = db.collection("users").doc(session.user.uid);

      await userRef.set(
        {
          name: session.user.name,
          tag: session.user.tag,
          email: session.user.email,
          // Add any other user data you want to store
        },
        { merge: true }
      );
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  session: {
    // Use session cookies with a longer duration to remember users
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
};

export default NextAuth(authOptions);

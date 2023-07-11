import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import admin from "firebase-admin";

const serviceAccount = require('/huco.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://huco-9f896-default-rtdb.firebaseio.com"
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
};

export default NextAuth(authOptions);

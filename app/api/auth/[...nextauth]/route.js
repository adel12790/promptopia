import NextAuth from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/User";

const handler = NextAuth({
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({email: session.user.email});

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({profile}) {
            try {
                // serverless => lambda -> dynamodb
                await connectToDatabase();

                // check if a user already exists
                const userExists = await User.findOne({email: profile.email});

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.email.split("@")[0].toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error(error)
                return false;
            }
        },
    },

})

export { handler as GET, handler as POST };
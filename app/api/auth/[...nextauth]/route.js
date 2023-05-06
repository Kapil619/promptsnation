import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from "next-auth/react";

import { connectToDB } from "@utils/database";



const handler = NextAuth( {
    providers: [GoogleProvider({
        clientId: process.env,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    async session ({ session }){

    },
    async signIn({profile}){
        try {
             await connectToDB();

            //  check if user exists

        } catch (error) {
           console.log(error)
           return false; 
        }
    }
})

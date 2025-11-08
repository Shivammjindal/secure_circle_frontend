import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/User";
import connect from "./db";
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
    providers : [
        Credentials({

            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                
                // Vaidate credentials by Loggin in next-auth using own email and password
                if(!credentials?.email.length || !credentials?.password.length){
                    return null
                }

                await connect()

                const existingUser = await User.findOne({
                    email : credentials.email
                })

                if(!existingUser){
                    return null
                }

                //varyfying password
                const match = await bcrypt.compare(credentials?.password, existingUser?.password)

                if(!match){
                    // string you pass in error must start with negative word
                    return null
                }

                return {
                    id: existingUser._id.toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                };
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_LOGIN as string,
            clientSecret: process.env.GOOGLE_LOGIN_SECRET as string
        }),
    ],
    callbacks : {
        async signIn({user, account}){

            await connect()
            
            if(account?.type === "oauth"){

                const existingUser = await User.findOne({
                    email : user.email
                })

                if(existingUser){
                    return true;
                }

                await User.create({
                    email : user.email,
                })

                return true;
            }

            return true
        },
        async jwt({token, user}){
            
            if(user){
                token.id = user.id
            }

            return token
        },
        async session({session, token}){
            // in session we get session as well as jwt token here we can modify jwt token well as session
            if(session.user){
                // ab hmare pas user ka bhi access hai sb jgh
                session.user.id = token.id as string
            }

            return session
        },
    },
    session:{
        strategy:"jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages:{
        signIn:'/login',
        error:'/error',
    },
    secret: process.env.NEXTAUTH_SECRET
}
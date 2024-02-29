import { AuthOptions } from "next-auth";
import prisma from './../../../../lib/prisma'
import  CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {

    providers: [

         CredentialsProvider({
            name: "Credential",

            credentials:{
                username: {
                    lable: "User Name",
                    type: "text",
                    placeholder: "Enter User Name"
                },

                password: {
                    lable: "Password",
                    type: "password",
                    placeholder: "Enter password"
                }
            },

            async authorize(credentials){
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.username
                    }
                })

                if(!user) throw new Error("Email is wrong")

                const passwordCheck = credentials?.password === user.password
 
                if(!passwordCheck) throw new Error("Password incorrect")

                const {password, ...userWithoutPassword} = user

                return userWithoutPassword;
            }


         })
    ]

    
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
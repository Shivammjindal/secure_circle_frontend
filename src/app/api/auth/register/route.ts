import { NextRequest,NextResponse } from "next/server";
import connect from "@/app/lib/db";
import { User } from "@/models/User";

export async function POST(request : NextRequest){

    try {

        const { name, email, password } = await request.json()

        if(!name || !email || !password){
            return new NextResponse('Insufficient Data',{ status: 400 })
        }

        await connect()

        const existingUser = await User.findOne({
            email : email
        })

        if(existingUser){
            return new NextResponse('User Alreagy Exists Kindly Login', { status:400 })
        }

        const newUser = await User.create({
            name : name,
            email : email,
            password : password
        })
        
        return NextResponse.json(newUser, { status: 201 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error',{ status: 500 })
    }

}
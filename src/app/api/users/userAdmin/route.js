import userModel from '@/models/userModel'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'


// get all users are present in the database and show to client
export async function GET(request) {

    const token = request.cookies.get('userToken')?.value
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = decode.email;
   

    try {
        const Users = await userModel.find({email : currentUser}).select("-password")
        
        if(!Users){
            console.log("failed to load user....[server]...")
            return;
        }
        return NextResponse.json(Users)

    } catch (error) {
        console.log("failed to load users...")
        return NextResponse.json({
            message: "failed to laod users",
            success: false
        })
    }
}


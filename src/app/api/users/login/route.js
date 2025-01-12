import User from "@/models/userModel"
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connect from "@/Config/database";
import jwt from 'jsonwebtoken'

//database connection
connect()

export async function POST(request) {
    try {
        //get data from body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            console.log("All fields are mandatory.... ")
            return NextResponse.json({ 
                success: false, 
                message: "All fields are mandatory" 
            })
        }

        // check user exists or not
        const user = await User.findOne({ email: email })
        if (!user) {
            console.log("user does not exists....")
            return NextResponse.json({ 
                success: false, 
                message: "User does not exists" 
            });
        }

        // check the password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            console.log("Invalid Password...")
            return NextResponse.json({
                errCode: "pass",
                success: false, 
                message: "Invalid Password"
            })
        }

        // token payload for token 
        const tokenPayload = {
            id: user._id,
            email: user.email,
            userType: user.userType
        }

        //create token
        const token = await jwt.sign(
            tokenPayload,               //payload
            process.env.SECRET_KEY,     // secret for token
            { expiresIn: '1d' }         // token expiry  
        );

        const response = NextResponse.json({
            success: true,
            message: "Login Successful",
        }, { status: 201 })

        console.log("Login Successful..[server].. ")

        response.cookies.set("userToken", token, { httpOnly: true })

        // now return the response
        return response;

    } catch (error) {
        console.log("Login failed...", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
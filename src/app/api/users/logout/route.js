import { NextResponse } from 'next/server';

export async function POST(request) {
    try {

        const response = NextResponse.json({
            message: "Logout Successful",
            success: true,
        }, { status: 200 });

        
        response.cookies.set("userToken", '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(0)
        });


        console.log("Logout successful...");
        return response;
        
    } catch (error) {
        console.log("Failed to logout user...", error);
        return NextResponse.json({
            message: "Failed to logout",
            success: false,
        });
    }
}

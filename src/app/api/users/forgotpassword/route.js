// app/api/users/forgotpassword/route.js
import connect from "@/Config/database";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { sendPasswordResetEmail } from "@/Config/emailFormat";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store the hashed version in the database
        const hashedToken = await bcryptjs.hash(resetToken, 12);

        // Save the HASHED token to user
        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        await user.save();

        // Generate reset URL
        const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${resetToken}`;

        // Send password reset email
        await sendPasswordResetEmail(user.email, user.username, resetUrl);

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
        });

    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
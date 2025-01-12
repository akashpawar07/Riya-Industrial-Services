// app/api/users/resetpassword/route.js
import connect from "@/Config/database";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendPasswordResetSuccessEmail } from "@/Config/emailFormat";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        // Get all users with unexpired tokens
        const users = await User.find({
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        // Find the user with the matching hashed token
        let matchedUser = null;
        for (const user of users) {
            const isValidToken = await bcryptjs.compare(token, user.forgotPasswordToken);
            if (isValidToken) {
                matchedUser = user;
                break;
            }
        }

        if (!matchedUser) {
            return NextResponse.json(
                { error: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(newPassword, 12);

        // Update user password and clear reset token
        const updatedUser = await User.findByIdAndUpdate(
            matchedUser._id,
            {
                $set: {
                    password: hashedPassword,
                    forgotPasswordToken: "",
                    forgotPasswordTokenExpiry: ""
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "Failed to update password" },
                { status: 500 }
            );
        }

        // Send success confirmation email
        await sendPasswordResetSuccessEmail(updatedUser.email, updatedUser.username);

        return NextResponse.json({
            message: "Password reset successful",
            success: true,
        });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
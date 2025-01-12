// Config/emailFormat.js
import nodemailer from 'nodemailer';

// Create transporter
export const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Generate password reset email HTML
export const generatePasswordResetEmail = (username, resetUrl) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1a73e8; margin: 0;">Riya Industrial Services </h1>
                </div>
                
                <div style="color: #333333; font-size: 16px; line-height: 1.6;">
                    <p style="margin-bottom: 15px;">Hello ${username || 'Valued User'},</p>
                    
                    <p style="margin-bottom: 20px;">We received a request to reset the password for your account. If you made this request, please click the button below to reset your password:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #1a73e8; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Your Password</a>
                    </div>
                    
                    <p style="margin-bottom: 20px; color: #666666;">This password reset link will expire in 1 hour for security reasons. After that, you'll need to submit a new password reset request.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 0; color: #666666; font-size: 14px;">If you didn't request a password reset, please ignore this email or contact our support team if you have concerns about your account's security.</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                        <p style="margin-bottom: 10px; color: #666666; font-size: 14px;">Best regards,</p>
                        <p style="margin: 0; color: #666666; font-size: 14px;">The Riya Industrial Services Team</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center; color: #666666; font-size: 12px;">
                    <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
                    <p style="margin: 0;">© ${new Date().getFullYear()} riya industrial services. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Generate password reset success email HTML
export const generatePasswordResetSuccessEmail = (username) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1a73e8; margin: 0;">Riya Industrial Services </h1>
                </div>
                
                <div style="color: #333333; font-size: 16px; line-height: 1.6;">
                    <p style="margin-bottom: 15px;">Hello ${username || 'Valued User'},</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <div style="color: #2E7D32; font-size: 48px; margin-bottom: 10px; font-weight: bold;">✓</div>
                        <h2 style="color: #4CAF50; margin-top: 5px;">Password Reset Successful!</h2>
                    </div>
                    
                    <p style="margin-bottom: 20px;">Your password has been successfully reset. You can now log in to your account using your new password.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                        <p style="margin: 0; color: #666666; font-size: 14px;">If you did not make this change or if you believe an unauthorized person has accessed your account, please contact our support team immediately.</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                        <p style="margin-bottom: 10px; color: #666666; font-size: 14px;">Best regards,</p>
                        <p style="margin: 0; color: #666666; font-size: 14px;">The Riya Industrial Services Team</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee; text-align: center; color: #666666; font-size: 12px;">
                    <p style="margin-bottom: 10px;">This is an automated message, please do not reply to this email.</p>
                    <p style="margin: 0;">© ${new Date().getFullYear()} riya industrial services. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};



// Send password reset email
export const sendPasswordResetEmail = async (email, username, resetUrl) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Instructions - Your Account Security',
        html: generatePasswordResetEmail(username, resetUrl)
    };

    await transporter.sendMail(mailOptions);
};



// Send password reset success email
export const sendPasswordResetSuccessEmail = async (email, username) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Successful - Action Completed',
        html: generatePasswordResetSuccessEmail(username)
    };

    await transporter.sendMail(mailOptions);
};
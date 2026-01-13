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

// password-reset-intruction HTMLBody
export const passwordResetEmailHTMLBody = (username, resetUrl) => {
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
// send password-reset-intruction email
export const sendPasswordResetEmail = async (email, username, resetUrl) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Instructions - Your Account Security',
        html: passwordResetEmailHTMLBody(username, resetUrl)
    };

    await transporter.sendMail(mailOptions);
};


// reset-password-success HTMLBody
export const passwordResetSuccessEmailHTMLBody = (username) => {
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
// send reset-passsword-success email
export const sendPasswordResetSuccessEmail = async (email, username) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Password Reset Successful - Action Completed',
        html: passwordResetSuccessEmailHTMLBody(username)
    };

    await transporter.sendMail(mailOptions);
};


// Job Application submitted HTMLBody
export const jobApplicationHTMLbody = (applicantName, applicationId, jobTitle) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #374151;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f9fafb;
            padding: 40px 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-top: 4px solid #2563eb; /* Professional Blue Accent */
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 40px;
        }
        .header {
            text-align: left;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 700;
            color: #111827;
            margin: 0;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        .body-text {
            font-size: 16px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 24px;
        }
        .info-card {
            background-color: #f3f4f6;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 24px;
        }
        .info-row {
            margin-bottom: 8px;
            font-size: 14px;
        }
        .info-row:last-child { margin-bottom: 0; }
        .label {
            font-weight: 600;
            color: #6b7280;
            width: 120px;
            display: inline-block;
        }
        .value {
            color: #111827;
            font-weight: 500;
        }
        .footer {
            text-align: center;
            padding: 24px;
            font-size: 12px;
            color: #9ca3af;
            line-height: 1.5;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
        .divider {
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="content">
                <div class="header">
                    <h1>Application Received</h1>
                </div>

                <div class="greeting">Hi ${applicantName},</div>
                
                <p class="body-text">
                    Thank you for applying to <strong>Riya Industrial Services</strong>. We've received your application for the <strong>${jobTitle || 'specified'}</strong> position and our team is currently reviewing your profile.
                </p>

                <div class="info-card">
                    <div class="info-row">
                        <span class="label">Reference ID:</span>
                        <span class="value">${applicationId}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Position:</span>
                        <span class="value">${jobTitle}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Date:</span>
                        <span class="value">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>

                <p class="body-text">
                    <strong>What’s next?</strong><br>
                    If your experience matches our requirements, a member of our hiring team will reach out to you within the next 7 business days for an initial interview.
                </p>

                <div class="divider"></div>

                <p class="body-text" style="font-size: 14px;">
                    Best regards,<br>
                    <span style="color: #111827; font-weight: 600;">Hiring Team, Riya Industrial Services</span>
                </p>
            </div>

            <div class="footer">
                <p>
                    <strong>Riya Industrial Services</strong><br>
                    Ankleshwar, Bharuch, Gujarat 393001
                </p>
                <p>
                    © ${new Date().getFullYear()} All rights reserved. <br>
                    Developed by <a href="https://akashpawar07.github.io/portfolio">Akash S Pawar</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

// Send job application success email
export const sendJobApplicationSuccessEmail = async (email, username, applicationId, jobTitle) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Application Received - ${jobTitle || 'Position'} | Application ID: ${applicationId}`,
        html: jobApplicationHTMLbody(username, applicationId, jobTitle)
    };

    await transporter.sendMail(mailOptions);
};
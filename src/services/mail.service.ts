import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendOtpEmail = async (email: string, otp: string) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP - Pro Health",
        html: `
      <h3>Password Reset Request</h3>
      <p>Your OTP for password reset is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
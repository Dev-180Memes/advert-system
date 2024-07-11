import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { connectToDatabase } from "@/utils/mongodb";
import User from "@/models/User";
import Report from "@/models/Report";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { id } = req.query;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    await connectToDatabase();

    const users = await User.find({ clientTo: id });

    const successfulEmails: string[] = [];
    const failedEmails: string[] = [];

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await Promise.all(users.map(async (user) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: title,
            text: content,
        };

        try {
            await transporter.sendMail(mailOptions);
            successfulEmails.push(user.email);
        } catch (error) {
            failedEmails.push(user.email);
        }
    }));

    await Report.create({
        campaignTitle: title,
        content,
        successfulEmails,
        failedEmails,
        createdBy: id,
    });

    return res.status(201).json({ message: "Campaign sent successfully" });
}
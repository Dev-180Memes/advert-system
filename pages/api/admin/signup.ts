import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/utils/mongodb';
import Admin from '@/models/Admin';

type Data = {
  message: string;
  token?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        await connectToDatabase();

        const admin = await Admin.findOne({ username });

        if (admin) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            const admin = await Admin.findOne({ email });

            if (admin) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await Admin.create({ username, email, password: hashedPassword });

            res.status(201).json({ message: 'Admin created successfully' });
        }

    } catch (error) {
        console.error('Error during admin signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
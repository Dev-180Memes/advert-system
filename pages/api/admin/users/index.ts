import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/mongodb';
import User from '@/models/User';

type Data = {
  user?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { email, name, adminId } = req.body;

      const user = new User({
        email,
        name,
        clientTo: adminId,
      });

      await user.save();

      res.status(201).json({ message: 'Client created', user});
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/mongodb';
import User from '@/models/User';

type Data = {
  message?: string;
  user?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'DELETE') {
        try {
            await connectToDatabase();

            const { id } = req.query;

            await User.findByIdAndDelete(id);

            res.status(200).json({ message: 'Client deleted' });
        } catch (error) {
            console.error('Error deleting client:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            await connectToDatabase();

            const { id } = req.query;

            const user = await User.findById({ clientTo: id });

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error getting client:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
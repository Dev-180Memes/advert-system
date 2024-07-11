import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/utils/mongodb'
import Report from '@/models/Report'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    await connectToDatabase();

    const report = await Report.findById({ createdBy: id })

    if (!report) {
        return res.status(404).json({ message: 'Report not found' });
    }

    return res.status(200).json(report);
};
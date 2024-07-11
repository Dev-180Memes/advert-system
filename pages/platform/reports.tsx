import React, { useEffect, useState } from 'react';
import { IReport } from '@/models/Report';
import axios from 'axios';
import { decodeJWT } from '@/utils/decodeToken';
import withAuth from '@/components/hoc/withAuth';

const Reports: React.FC = () => {
    const [reports, setReports] = useState<IReport[]>([]);

    useEffect(() => {
        const fetchReports = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const { id } = decodeJWT(token);
                const { data } = await axios.get(`/api/reports/${id}`);

                if (data.report) {
                    setReports(data.report);
                } else {
                    console.error('Error getting reports:', data.message);
                }
            }
        }

        fetchReports();
    }, []);

  return (
    <div>
        <h2>Reports</h2>
        {reports.map((report, index) => (
            <div key={index}>
                <h3>{report.campaignTitle}</h3>
                <p>{report.content}</p>
                <p>Successful Emails: {report.successfulEmails.length}</p>
                <p>Failed Emails: {report.failedEmails.length}</p>
                <p>Created At: {new Date(report.createdAt).toLocaleString()}</p>
            </div>
        ))}
    </div>
  )
}

export default withAuth(Reports);

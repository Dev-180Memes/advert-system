import React, { useEffect, useState } from 'react';
import { IReport } from '@/models/Report';
import axios from 'axios';
import { decodeJWT } from '@/utils/decodeToken';
import withAuth from '@/components/hoc/withAuth';
import Navbar from '@/components/Navbar';

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
    <>
        <Navbar />
        <div
            className='container mx-auto p-4 mt-40 md:mt-10'
        >
            <h2
                className='text-2xl font-bold mb-4 text-center text-gray-800'
            >Reports</h2>
            {reports.map((report, index) => (
                <div
                    key={index}
                    className='bg-white p-4 rounded-lg shadow-md'
                >
                    <h3
                        className='text-lg font-semibold mb-2'
                    >{report.campaignTitle}</h3>
                    <p
                        className='mb-2'
                    >{report.content}</p>
                    <p
                        className='mb-2'
                    >Successful Emails: {report.successfulEmails.length}</p>
                    <p
                        className='mb-2'
                    >Failed Emails: {report.failedEmails.length}</p>
                    <p
                        className='mb-2'
                    >Created At: {new Date(report.createdAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    </>
    // <div>
    //     <h2>Reports</h2>
    //     {reports.map((report, index) => (
    //         <div key={index}>
    //             <h3>{report.campaignTitle}</h3>
    //             <p>{report.content}</p>
    //             <p>Successful Emails: {report.successfulEmails.length}</p>
    //             <p>Failed Emails: {report.failedEmails.length}</p>
    //             <p>Created At: {new Date(report.createdAt).toLocaleString()}</p>
    //         </div>
    //     ))}
    // </div>
  )
}

export default withAuth(Reports);

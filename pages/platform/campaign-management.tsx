import React, { useState } from 'react'
import { decodeJWT } from '@/utils/decodeToken'
import axios from 'axios'
import withAuth from '@/components/hoc/withAuth'
import Navbar from '@/components/Navbar'

const Campaign = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const createCampaign = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !content) {
            alert('Title and content are required')
            return
        }

        const token = localStorage.getItem('token');
        if (token) {
            const { id } = decodeJWT(token);
            const { data } = await axios.post(`/api/campaign/${id}`, {
                title,
                content,
            });

            if (data.message) {
                alert(data.message);
            } else {
                console.error('Error creating campaign:', data.message);
            }
        }
    }

  return (
    <>
        <Navbar />
        <div
            className='container mx-auto p-4 mt-40 md:mt-10'
        >
            <form 
                className='bg-white p-4 rounded-lg shadow-md'
                onSubmit={createCampaign}>
                <div
                    className='mb-4'
                >
                    <label 
                        className='block text-lg font-semibold mb-2'
                        htmlFor="title">Campaign Title</label>
                    <input
                        className='w-full p-2 border border-gray-300 rounded-lg' 
                        type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div
                    className='mb-4'
                >
                    <label 
                        className='block text-lg font-semibold mb-2'
                        htmlFor="content">Campaign Content</label>
                    <textarea 
                        className='w-full p-2 border border-gray-300 rounded-lg'
                        rows={5}
                        id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button 
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type="submit">Create Campaign</button>
            </form>
        </div>
    </>
  )
}

export default withAuth(Campaign);

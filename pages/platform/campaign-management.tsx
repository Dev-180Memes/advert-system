import React, { useState } from 'react'
import { decodeJWT } from '@/utils/decodeToken'
import axios from 'axios'
import withAuth from '@/components/hoc/withAuth'

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
    <div>
      <form onSubmit={createCampaign}>
        <div>
            <label htmlFor="title">Campaign Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
            <label htmlFor="content">Campaign Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  )
}

export default withAuth(Campaign);

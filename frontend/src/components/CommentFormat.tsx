import React from 'react'

interface myProps {
    Comment: {
        author: number,
        cId: number,
        content: string,
        created_at: string,
    }
}

const Comment: React.FC<myProps> = ({ Comment }) => {
    const formattedDate = new Date(Comment.created_at).toLocaleDateString('en-US')

    return <div className='Comment-container'>
        <p className='Comment-content'>{Comment.content}</p>
        <p className='Comment-date'>{formattedDate}</p>
    </div>
}

export default Comment
import React from 'react'

interface myProps {
    Blog: {
        author: number,
        bId: number,
        title: string,
        content: string,
        created_at: string,
        upvotes: number
    }
}

const Blog: React.FC<myProps> = ({ Blog }) => {
    const formattedDate = new Date(Blog.created_at).toLocaleDateString('en-US')

    return <div className='blog-container'>
        <p className='blog-title'>{Blog.title}</p>
        <p className='blog-content'>{Blog.content}</p>
        <p className='blog-date'>{formattedDate}</p>
        <p className='blog-upvotes'>{Blog.upvotes}</p>
    </div>
}

export default Blog
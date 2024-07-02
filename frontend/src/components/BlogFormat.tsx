import React from 'react'

interface myProps {
    Blog: {
        author: number,
        id: number,
        title: string,
        content: string,
        created_at: string,
        upvotes: number
    }
}

const Blog: React.FC<myProps> = ({ Blog }) => {
    const formattedDate = new Date(Blog.created_at).toLocaleDateString('en-US')

    return <div className='blog-container'>
        <a href={'http://localhost:5173/blog/' + Blog.id} className='blog-title'>{Blog.title}</a>
        <p className='blog-content'>{Blog.content}</p>
        <p className='blog-date'>{formattedDate}</p>
        <p className='blog-upvotes'>{Blog.upvotes}</p>
    </div>
}

export default Blog
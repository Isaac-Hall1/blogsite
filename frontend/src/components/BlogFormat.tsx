import React, { useState } from 'react'
import api from '../api'

interface myProps {
    Blog: {
        author: number,
        id: number,
        title: string,
        content: string,
        created_at: string,
        upvoteValue: number
    }
}

const Blog: React.FC<myProps> = ({ Blog }) => {
    const formattedDate = new Date(Blog.created_at).toLocaleDateString('en-US')
    const [upvote, setUpvote] = useState<number>(Blog.upvoteValue)

    const changeUpvotes = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        const target = event.currentTarget;
        const action = target.getAttribute('data-action');

        var blogId = Blog.id
        var vote = 0
        if(action === 'upvote'){
            vote = 1
        } else {
            vote = -1
        }
        await api.post('api/blog/posts/changeUpvote/', {vote, blogId})
        .then((res) => res.data)
        .then((data: string) => {
            if(data === 'changed')
                setUpvote(upvote + (vote * 2))
            else if(data === 'unvoted')
                setUpvote(upvote - vote)
            else
                setUpvote(upvote + vote)
            console.log(data)
        })
        .catch((error) => alert(error))
    }

    return <div className='blog-container'>
        <a href={'http://localhost:5173/blog/' + Blog.id} className='blog-title'>{Blog.title}</a>
        <p className='blog-content'>{Blog.content}</p>
        <p className='blog-date'>{formattedDate}</p>
        <div>
            <button data-action='upvote' onClick={changeUpvotes}>Upvote</button>
            <p className='blog-upvotes'>{upvote}</p>
            <button data-action='downvote' onClick={changeUpvotes}>Downvote</button>
        </div>
    </div>
}

export default Blog
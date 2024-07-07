import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

interface myProps {
    Blog: {
        author: number,
        id: number,
        title: string,
        content: string,
        created_at: string,
        upvoteValue: number
    }
    mypost: boolean,
    blogview: boolean
}

interface User  {
    id: number,
    username: string,
}

const Blog: React.FC<myProps> = ({ Blog, mypost, blogview}) => {
    const formattedDate = new Date(Blog.created_at).toLocaleDateString('en-US')
    const [upvote, setUpvote] = useState<number>(Blog.upvoteValue)
    const [authorName, setAuthorName] = useState<string>('')
    const nav = useNavigate()

    useEffect(() => {
        getAuthor()
    },[])

    const getAuthor = () => {
        api.get('/api/user/register/')
        .then((res) => res.data)
        .then((data: User[]) => {
            const user = data.find((user: User) => user.id === Blog.author)
            if(user){
                setAuthorName(user.username)
            }
        })
        .catch((err) => console.log(err))
    }

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
        .catch(() => {
            nav('/mustlogin')
        })
    }

    const deleteForm = async(): Promise<void> => {
        await api.delete(`api/blog/delete/${Blog.id}/`)
        .catch((error) => alert(error))
        window.location.reload()
    }


    return  (
    <div className='py-2'>
        {blogview ? (
            <>
                <h2 className='blog-title'>{Blog.title}</h2>
                <p className='blog-author'>{authorName}</p>
                <p className='blog-content'>{Blog.content}</p>
                <p className='blog-date'>{formattedDate}</p>
                <div>
                    <button data-action='upvote' onClick={changeUpvotes}>Upvote</button>
                        <p className='blog-upvotes'>{upvote}</p>
                    <button data-action='downvote' onClick={changeUpvotes}>Downvote</button>
                </div>
            </>
            ) : (
                <>
                <div className='w-full p-4 text-center border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700'>
                    <div onClick={() =>  nav('/blog/' + Blog.id)} className='hover:cursor-pointer'>
                        <h2 className='mb-2 text-3xl font-bold text-white'>{Blog.title}</h2>
                        <p className='mb-5 text-base sm:text-lg text-gray-400'>{Blog.content}</p>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-1/3'>
                            <p className='truncate'>{formattedDate}</p>
                        </div>
                        <div className='w-1/3'>
                            {mypost ? (<button className='text-black rounded-sm px-2 bg-red-700' onClick={deleteForm}>Delete</button>) : (<p className='truncate'>{authorName}</p>)}
                        </div>
                        <div className='w-1/3 flex justify-center'>
                            <button className='text-black rounded-sm px-2 text-right hover:cursor-pointer bg-green-400' data-action='upvote' onClick={changeUpvotes}>Upvote</button>
                                <p className='truncate px-2'>{upvote}</p>
                            <button className='text-black rounded-sm px-2 text-left hover:cursor-pointer bg-red-600' data-action='downvote' onClick={changeUpvotes}>Downvote</button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}
export default Blog
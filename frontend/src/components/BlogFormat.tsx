import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

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
    blogview: boolean,
}

interface User  {
    id: number,
    username: string,
}

interface upvote {
    blog: number,
    author: number,
    isUpvote: boolean
  }

const Blog: React.FC<myProps> = ({ Blog, mypost, blogview}) => {
    const formattedDate = new Date(Blog.created_at).toLocaleDateString('en-US')
    const [upvote, setUpvote] = useState<number>(Blog.upvoteValue)
    const [authorName, setAuthorName] = useState<string>('')
    const [userUpvoted, setUserUpvoted] = useState<boolean>(() => {
        const votes = localStorage.getItem('VOTE')
        if(votes){
            const voteArr = JSON.parse(votes)
            const vote: upvote = voteArr.find((vote: upvote) => vote.blog === Blog.id)
            if(vote)
                return vote.isUpvote
        }
        return false
    })
    const [userDownvoted, setUserDownvoted] = useState<boolean>(() => {
        const votes = localStorage.getItem('VOTE')
        if(votes){
            const voteArr = JSON.parse(votes)
            const vote: upvote = voteArr.find((vote: upvote) => vote.blog === Blog.id)
            if(vote && !vote.isUpvote)
                return !vote.isUpvote
        }
        return false
    })
    const nav = useNavigate()


    useEffect(() => {
        getAuthor()
    },[])

    const getAuthor = () => {
        api.get('/api/user/register/', {params:{id:Blog.author}})
        .then((res) => res.data)
        .then((data: User) => {
            setAuthorName(data.username)
        })
        .catch((err) => console.log(err))
    }

    const changeUpvotes = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.stopPropagation()
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
            const votes: string | null = localStorage.getItem('VOTE')
            let voteArr: upvote[] = []
            let position: number = 0
            if(votes){
                voteArr = JSON.parse(votes)
                for(let i = 0; i < voteArr.length; i++){
                    if(voteArr[i].blog === Blog.id)
                        position = i
                }
            }
            if(data === 'changed'){
                setUpvote(upvote + (vote * 2))
                !voteArr[position].isUpvote
                setUserDownvoted(!userDownvoted)
                setUserUpvoted(!userUpvoted)
            }
            else if(data === 'unvoted'){
                setUpvote(upvote - vote)
                voteArr = voteArr.filter((userVote: upvote) => userVote.blog !== Blog.id);
                if(vote === 1)
                    setUserUpvoted(!userUpvoted)
                else
                    setUserDownvoted(!userDownvoted)
            }
            else{
                setUpvote(upvote + vote)
                const newUpvote: upvote = { 'blog': Blog.id, 'author': Number(data), 'isUpvote': false }
                if(vote === 1){
                    newUpvote.isUpvote = true
                    setUserUpvoted(true)
                    setUserDownvoted(false)
                } else {
                    newUpvote.isUpvote = false
                    setUserDownvoted(true)
                    setUserUpvoted(false)
                }
                voteArr.push(newUpvote)
            }
            localStorage.setItem('VOTE', JSON.stringify(voteArr))
        })
        .catch(() => {
            nav('/mustlogin')
        })
    }

    const deleteForm = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
        event.stopPropagation()
        if (confirm('Are You sure you want to delete this blog?')) {
            await api.delete(`api/blog/delete/${Blog.id}/`)
            .catch((error) => alert(error))
            window.location.reload()
        }
    }

    return  (
    <div className='py-2'>
        {blogview ? (
            <>
                <div className='max-w-screen-lg mx-auto'>
                    <div>
                        <div className='flex justify-center items-center text-center pb-8'>
                            <h2 className='text-white sm:text-6xl text-2xl font-bold '>{Blog.title}</h2>
                        </div>
                        <div className='flex justify-center items-center flex-col py-2 sm:py-0 sm:flex-row'>
                            <div className='w-1/3 text-center sm:text-left'>
                                <p className='truncate text-gray-400'>{formattedDate}</p>
                            </div>
                            <div className='w-1/3 text-center'>
                                <p className='truncate text-gray-400'>{authorName}</p>
                            </div>
                            <div className='w-1/3 flex flex-col sm:flex-row justify-end'>
                                <button className={`${userUpvoted ? 'upvBtn-clicked' : 'upvBtn-primary'}`} data-action='upvote' onClick={changeUpvotes}>Upvote</button>
                                    <p className='truncate px-2 text-center'>{upvote}</p>
                                <button className={`${userDownvoted ? 'dvtBtn-clicked' : 'dvtBtn-primary'}`} data-action='downvote' onClick={changeUpvotes}>Downvote</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start pt-10'>
                        <p className='text-left'>{Blog.content}</p>
                    </div>
                </div>
            </>
            ) : (
                <>
                <div onClick={() =>  nav('/blog/' + Blog.id)} className='group w-full p-4 text-center border rounded-lg shadow sm:p-8 border-gray-700 hover:cursor-pointer hover:bg-slate-950'>
                    <div className=''>
                        <h2 className='mb-2 text-3xl font-bold text-white line-clamp-4'>{Blog.title}</h2>
                        <p className='mb-5 text-base sm:text-lg text-gray-400 line-clamp-2'>{Blog.content}</p>
                    </div>
                    <div className='flex items-center flex-col py-2 sm:py-0 sm:flex-row'>
                        <div className='w-1/3'>
                            <p className='truncate'>{formattedDate}</p>
                        </div>
                        <div className='w-1/3'>
                            {mypost ? (<button className='text-black rounded-sm px-2 bg-red-700' onClick={deleteForm}>Delete</button>) : (<p className='truncate'>{authorName}</p>)}
                        </div>
                        <div className='w-1/3 flex flex-col sm:flex-row justify-center'>
                            <button className={`${userUpvoted ? 'upvBtn-clicked' : 'upvBtn-primary'}`} data-action='upvote' onClick={changeUpvotes}>Upvote</button>
                                <p className='truncate px-2'>{upvote}</p>
                            <button className={`${userDownvoted ? 'dvtBtn-clicked' : 'dvtBtn-primary'}`} data-action='downvote' onClick={changeUpvotes}>Downvote</button>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}
export default Blog
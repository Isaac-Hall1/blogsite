import { useEffect, useState } from "react"
import api from "../api"
import Blog from "../components/BlogFormat"
import { useNavigate, useParams } from 'react-router-dom';
import Comment from "../components/CommentFormat";
import CreateComment from "../components/CreateComment";
import { ACCESS_TOKEN, BLOGID } from "../constants";

interface BlogType {
    author: number,
    id: number,
    title: string,
    content: string,
    htmlContent: string,
    created_at: string,
    upvoteValue: number,
}

interface CommentType {
    author: number,
    cId: number,
    content: string,
    created_at: string,
}

const commentArray: CommentType[] = []

const blogObject: BlogType = {
    author : -1,
    id: -1,
    title: '',
    content: '',
    htmlContent: '',
    created_at: '',
    upvoteValue: -1
}


function BlogView(){
    const [blog, setBlog] = useState<BlogType>(blogObject)
    const [loading, setLoading] = useState<boolean>(true)
    const [comments, setComments] = useState<CommentType[]>(commentArray)
    const [content, setContent] = useState<string>('Create Comment')
    const [creatingComment, setCreatingComment] = useState<boolean>(true)
    const { bId } = useParams<{bId: string}>()
    const navigate = useNavigate()
    if(!Number.isNaN(Number(bId)) && bId)
        localStorage.setItem(BLOGID, bId)
    const blogId = Number(localStorage.getItem(BLOGID))


    useEffect(() => {
        getBlog(blogId);
        getComments(blogId)
    }, [blog.author])
    
    const getBlog = (bId: number) => {
        api.get('/api/blog/post/', {params: {id: bId}})
        .then((res) => res.data)
        .then((data: BlogType) => {
            setBlog(data)
            history.pushState({}, '', `/blog/${slugify(data.title)}`)
            setLoading(false)
        })
        .catch((err) => {
            if(err.response && err.response.status === 404)
                navigate('/home')
            else{
                console.log(err)
                setLoading(false)
            }
        })
    }

    const getComments = (bId: number) => {
        api.get('/api/blog/comments/', {params:{post: bId}} )
        .then((res) => res.data)
        .then((data: CommentType[]) => {
            setComments(data)
        })
    }


    const slugify = (text: string) => {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');
    }

    const handleCreateComment = async (): Promise<void> => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN)
        if(token){
            setCreatingComment(!creatingComment)
            if(creatingComment)
                setContent('See Comments')
            else
                setContent('Create Comment')
        } else {
            navigate('/mustlogin')
        }
        
    }

    if(loading){
        return <p>Loading...</p>
    }

    return (
    <div>
        <div>
            <Blog Blog={blog} mypost={false} blogview={true}/>
            <div className="max-w-screen-lg mx-auto">
                <button className='bg-blue-600 rounded-md py-2 px-6' onClick={handleCreateComment}>{content}</button>
                {creatingComment ? (
                        comments.map((comment) => <Comment Comment={comment} key={comment.cId}/>)
                    ) : (
                        <CreateComment post={blogId}/>
                    )
                }
            </div>
        </div>
    </div>
    );
}
export default BlogView
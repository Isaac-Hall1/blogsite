import { useEffect, useState } from "react"
import api from "../api"
import Blog from "../components/BlogFormat"
import { useNavigate, useParams } from 'react-router-dom';
import Comment from "../components/CommentFormat";
import refreshAccessToken from "../components/RefreshToken";
import CreateComment from "../components/CreateComment";
import { BLOGID } from "../constants";

interface BlogType {
    author: number,
    bId: number,
    title: string,
    content: string,
    created_at: string,
    upvotes: number,
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
    bId: -1,
    title: '',
    content: '',
    created_at: '',
    upvotes: -1
}

interface User  {
    id: number,
    username: string,
}


function BlogView(){
    const [blog, setBlog] = useState<BlogType>(blogObject)
    const [authorName, setAuthorName] = useState<string>('')
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
        if (blog.author && blog.author !== -1) {
            console.log(blog.author)
            getAuthor(blog.author);
            }
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
        api.get('/api/blog/comments/', {params:bId} )
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

    const getAuthor = (authorId: number ) => {
        api.get('/api/user/register/')
        .then((res) => res.data)
        .then((data: User[]) => {
            const user = data.find((user: User) => user.id === authorId)
            if(user){
                setAuthorName(user.username)
            }
        })
        .catch((err) => console.log(err))
    }

    const handleCreateComment = async (): Promise<void> => {
        try{
            await refreshAccessToken()
            setCreatingComment(!creatingComment)
            if(creatingComment)
                setContent('See Comments')
            else
                setContent('Create Comment')
        }
        catch{
            alert('You must be logged in to create a comment')
            navigate('/mustlogin')
        }
    }

    if(loading){
        return <p>Loading...</p>
    }

    return (
    <div>
        <div>
            <p>{authorName}</p>
            <Blog Blog={blog}/>
            <button onClick={handleCreateComment}>{content}</button>
            {creatingComment ? (
                    comments.map((comment) => <Comment Comment={comment} key={comment.cId}/>)
                ) : (
                    <CreateComment bId={blogId}/>
                )
            }
        </div>
    </div>
    );
}
export default BlogView
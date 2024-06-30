import { useEffect, useState } from "react"
import api from "../api"
import Blog from "../components/BlogFormat"
import { useNavigate, useParams } from 'react-router-dom';

interface BlogType {
    author: number,
    bId: number,
    title: string,
    content: string,
    created_at: string,
    upvotes: number,
}

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
    const { bId } = useParams<{bId: string}>()
    const navigate = useNavigate()
    const blogId = Number(bId)

    useEffect(() => {
        getBlog(blogId);
        if (blog.author && blog.author !== -1) {
            console.log(blog.author)
            getAuthor(blog.author);
            }
    }, [blog.author])
    
    const getBlog = (bId: number) => {
        api.get('/api/blog/post/', {params: {id: bId}})
        .then((res) => res.data)
        .then((data: BlogType) => {
            setBlog(data)
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

    if(loading){
        return <p>Loading...</p>
    }

    return (
    <div>
        <div>
            <p>{authorName}</p>
            <Blog Blog={blog}/>
        </div>
    </div>
    );
}
export default BlogView
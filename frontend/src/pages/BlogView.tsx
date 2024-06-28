import { useEffect, useState } from "react"
import api from "../api"
import Blog from "../components/BlogFormat"
import { useParams } from 'react-router-dom';
import RefreshToken from "../components/RefreshToken";
import { Navigate } from "react-router-dom";

function BlogView(){
    const [blog, setBlog] = useState({author: -1, bId: -1, title: '', content: '', created_at: '', upvotes: -1})
    const [authorName, setAuthorName] = useState('')
    let { bId } = useParams()
    let blogId = Number(bId)


    useEffect(() => {
        useEffect(() => {
            // Call RefreshToken function when the component mounts
            RefreshToken()
            getBlog(blogId);
            if (blog.author) {
                getAuthor(blog.author);
            }
        }, []);
    }, [])
    
    type User = {
        id: number,
        username: string
    }

    const getBlog = (bId: number) => {
        api.post('/api/blog/post/', { bId })
        .then((res) => res.data)
        .then((data) => {setBlog(data)})
        .catch((err) => alert(err))
    }

    const getAuthor = (authorId: number ) => {
        api.get('/api/user/register/')
        .then((res) => res.data)
        .then((data) => {
            const users: User[] = JSON.parse(data)
            const userId = authorId
            const user: User | undefined = users.find((user: User) => user.id === userId)
            if(user)
                setAuthorName(user.username)
        })
        .catch((err) => alert(err))
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
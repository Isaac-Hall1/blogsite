import { useEffect, useState } from "react"
import api from "../api"
import Blog from "../components/BlogFormat"

interface myProps {
    bId: number
}


const BlogView: React.FC<myProps> = ({bId}) => {
    const [blog, setBlog] = useState<blogData | null>(null)
    const [authorName, setAuthorName] = useState('')

    useEffect(() => {
        getBlog(bId);
    }, [])

    type blogData = {
        author: number,
        title: string,
        content:string,
        upvotes: number,
        created_at: Date,
    }
    
    type User = {
        id: number,
        username: string
    }

    const getBlog = (bId: number) => {
        api.post('/api/blog/post/', { bId })
        .then((res) => res.data)
        .then((data: blogData) => {setBlog(data)})
        .catch((err) => alert(err))
    }

    const getAuthor = (authorId: number) => {
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
        </div>
    </div>
    );
}

export default BlogView
import { FormEvent, useState } from "react";
import api from '../api'
import RefreshToken from "./RefreshToken";

function BlogForm(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        RefreshToken();
        await api.post('/api/blog/', {title, content})
        .then((res) => {
            if(res.status !== 201) alert('failed to create note')
            alert('created note')
            setTitle('')
            setContent('')
        })
        .catch((error) => alert(error))
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Blog</h1>
            <input
                className="form-input"
                type= 'text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className="form-input"
                type = 'text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Text"
            />
            <button className="form-button" type='submit'>Create Blog</button>
        </form>
    )
}

export default BlogForm
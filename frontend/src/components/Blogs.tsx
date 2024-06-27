import { FormEvent, useState } from "react";
import api from '../api'

function BlogForm(){
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await api.post('/api/blog/', {title, text})
        .then((res) => {
            if(res.status !== 201) alert('failed to create note')
            alert('created note')
            setTitle('')
            setText('')
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text"
            />
            <button className="form-button" type='submit'>Create Blog</button>
        </form>
    )
}

export default BlogForm
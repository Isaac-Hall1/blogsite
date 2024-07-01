import { FormEvent, useState } from "react";
import api from '../api'

/**
 * BlogForm: Component which represents the creation form for a blog
 * @returns a webpage view of blog creation
 */
function BlogForm(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [showForm, setShowForm] = useState(true);
    
    /**
     * 
     * @param e: represents an event, takes the content from the input and passes it into this submit
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await api.post('/api/blog/', {title, content})
        .then((res) => {
            if(res.status !== 201) alert('failed to create note')
            setShowForm(false)
            setTimeout(()=>{
                setShowForm(true)
                setTitle('')
                setContent('')
            }, 2000)
        })
        .catch((error) => alert(error))
    }

    return (
        <div>
            {showForm ? (
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
            ) : (
                <p>Note Created</p>
            )}
        </div>
    )
}

export default BlogForm
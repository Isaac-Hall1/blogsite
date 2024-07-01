import { FormEvent, useState } from "react"
import api from "../api"

interface MyProps {
    bId: number
}

const CreateComment: React.FC<MyProps> = ({bId}) => {
    const [content, setContent] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        await api.post('/api/blog/comments/', {bId, content})
        .then((res)=>{
            if(res.status !== 201) alert('failed to create comment')
        })
        .catch((error) => alert(error))
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Text: Cannot be longer than 200 characters"
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
}
export default CreateComment
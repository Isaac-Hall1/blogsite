import { FormEvent, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

interface MyProps {
    post: number
}

const CreateComment: React.FC<MyProps> = ({post}) => {
    const [content, setContent] = useState('')
    const nav = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        await api.post('/api/blog/createComment/', {post, content})
        .then((res)=>{
            if(res.status !== 201) alert('failed to create comment')
            nav('/')
            nav('/blog/' + post)
        })
        .catch(() => {
            alert('comment too long')
        })
    }

    return (
        <form onSubmit={handleSubmit} className="pt-5 flex flex-col">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-2/5 pb-10 text-black text-wrap rounded-md pl-2"
                placeholder="Text: Cannot be longer than 200 characters"
            />
            <div className="justify-start py-3">
                <button className='font-bold text-lg w-2/5 text-white focus:ring-4 focus:outline-none rounded-lg p-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800' type="submit">Submit Comment</button>
            </div>
        </form>
    );
}
export default CreateComment
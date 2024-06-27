import { FormEvent, useState } from "react";
import api from '../api'
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface myProps {
    method: string
}

const Form: React.FC<myProps> = ({method}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    interface loginResponse {
        accessToken: string,
        refreshToken: string
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try{
            if(method === 'Register'){
                await api.post('/api/user/register/', {username,password})
            }
            const res:loginResponse = await api.post('/api/token/', {username, password})
            localStorage.setItem(ACCESS_TOKEN, res.accessToken)
            localStorage.setItem(REFRESH_TOKEN, res.refreshToken)
            navigate('/home')
        } catch (error){
            alert(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method}</h1>
            <input
                className="form-input"
                type= 'text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type = 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type='submit'>{method}</button>
        </form>
    )
}

export default Form
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
        access: string,
        refresh: string
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try{
            if(method === 'Register'){
                localStorage.clear()
                await api.post('/api/user/register/', {username,password})
            }
            await api.post('/api/token/', {username, password})
            .then((res) => res.data)
            .then((data: loginResponse) => {
                    localStorage.setItem(ACCESS_TOKEN, data.access)
                    localStorage.setItem(REFRESH_TOKEN, data.refresh)
                    console.log(localStorage.getItem(ACCESS_TOKEN))
                    navigate('/home')
                }
            )
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
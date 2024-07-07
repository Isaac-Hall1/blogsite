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
            if(method === 'Register')
                alert('Your password must be at least 9 characters long or your username is already in use')
            else
                alert('Login information typed incorrectly or account not on file')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div className="w-full max-w-md p-4 rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-16">
                <h1 className="text-3xl font-medium text-white">{method}</h1>
                    <div>
                        <input
                            className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                            type= 'text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <input
                            className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                            type = 'password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                <button className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" type='submit'>{method}</button>
            </form>
        </div>
    )
}

export default Form
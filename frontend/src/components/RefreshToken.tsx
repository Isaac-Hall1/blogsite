import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { Navigate } from "react-router-dom";

function RefreshToken() {

    var isAuthorized: boolean = false

    const refreshToken = async () => {
        var refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            var res = await api.post('/api/token/refresh/', {
                refresh: refreshToken
            })
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.accesss)
                isAuthorized = true
            } else {
                isAuthorized = false
            } 
        } catch (error) {
            return <Navigate to='/login'/>
        }
    }

    const auth = async () => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            return 
        }
        var decoded = jwtDecode(token)
        var tokenExpiration = decoded.exp || 0
        var now = Date.now() / 1000

        if(tokenExpiration < now){
            await refreshToken()
        } else {
            isAuthorized = true
            var test = tokenExpiration - now
            console.log(test)
        }
        if(!isAuthorized){
            return <Navigate to='/login'/>
        }
    }
    auth()
}

export default RefreshToken
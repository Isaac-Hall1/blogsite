import { ACCESS_TOKEN } from "../constants";

function IsLoggedIn(): boolean {
    if(!localStorage.getItem(ACCESS_TOKEN))
        return false
    return true
}

export default IsLoggedIn
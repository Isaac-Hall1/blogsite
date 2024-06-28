import { Navigate } from "react-router-dom"
import BlogForm from "../components/Blogs"
import IsLoggedIn from '../components/IsLoggedIn'

function CreateBlogPost(){
  if(IsLoggedIn())
    return <BlogForm/>
  else
    <Navigate to='/mustlogin'/>
}

export default CreateBlogPost
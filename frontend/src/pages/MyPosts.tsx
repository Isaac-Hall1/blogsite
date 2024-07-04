import { useState, useEffect } from "react"
import api from "../api"
import Blog from '../components/BlogFormat'

function MyPosts(){
  // TODO: make a list of cards that span the screen each with an upvote and downvote button
  // and a hyperlink to a page displaying the blog
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getBlogs();
  }, [])

  const getBlogs = () => {
    api.get('/api/blog/myposts/')
    .then((res) => res.data)
    .then((data) =>{ setBlogs(data) })
    .catch((err) => alert(err));
  };

  return( 
  <div>
    <h2>My Blogs</h2>
    {blogs.map((blog) => <Blog Blog={blog} mypost={true}/>)}
  </div>
  );
}

export default MyPosts
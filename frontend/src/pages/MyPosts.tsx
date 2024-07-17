import { useState, useEffect } from "react"
import api from "../api"
import Blog from '../components/BlogFormat'

interface Blog {
  author: number,
  id: number,
  title: string,
  content: string,
  created_at: string,
  upvoteValue: number
}

function MyPosts(){
  // TODO: make a list of cards that span the screen each with an upvote and downvote button
  // and a hyperlink to a page displaying the blog
  const [blogs, setBlogs] = useState<Blog[]>([])

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
    {blogs.map((blog) => <Blog Blog={blog} mypost={true} blogview={false} key={blog.id}/>)}
  </div>
  );
}

export default MyPosts
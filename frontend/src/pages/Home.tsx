import { useState, useEffect } from "react"
import api from "../api"
import Blog from '../components/BlogFormat'

interface blog {
  author: number,
  id: number,
  title: string,
  content: string,
  htmlContent: string,
  created_at: string,
  upvoteValue: number
}

function Home(){
  // TODO: make a list of cards that span the screen each with an upvote and downvote button
  // and a hyperlink to a page displaying the blog
  const [blogs, setBlogs] = useState<blog[]>([])

  useEffect(() => {
    getBlogs();
  }, [])

  const getBlogs = () => {
    api.get('/api/blog/posts/')
    .then((res) => res.data)
    .then((data) =>{ setBlogs(data) })
    .catch((err) => console.log(err));
  };

  return( 
  <div>
    <div className="p-3">
      <h1 className="text-6xl font-bold flex justify-center">All Blogs</h1>
    </div>
    {blogs.map((blog) => <Blog Blog={blog} mypost={false} blogview={false} key={blog.id}/>)}
  </div>
  );
}

export default Home
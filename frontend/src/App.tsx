import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import MustLogin from './pages/MustLogin'
import MyPosts from './pages/MyPosts'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import CreateBlogPost from './pages/CreateBlog'
import BlogView from './pages/BlogView'
import IsLoggedIn from './components/ProtectedRoute'
import NavBar from './components/NavBar'
import './index.css'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className='max-w-screen-xl mx-auto p-4'>
        <NavBar/>
        <BrowserRouter>
          <Routes>
            <Route
              path='/logout'
              element={<Logout />}
            />
            <Route
              path='/home'
              element={<Home />}
            />
            <Route
              path='/blog/:bId'
              element={<BlogView />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/CreateBlog'
              element={
                <IsLoggedIn>
                  <CreateBlogPost />
                </IsLoggedIn>
              }
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/mustlogin'
              element={<MustLogin />}
            />
            <Route
              path='/myposts'
              element={
                <IsLoggedIn>
                  <MyPosts />
                </IsLoggedIn>
              }
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import MustLogin from './pages/MustLogin'
import MyPosts from './pages/MyPosts'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
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
          element={<MyPosts />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

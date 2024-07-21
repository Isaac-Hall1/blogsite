import { useNavigate } from "react-router-dom"

function MustLogin(){

  const nav = useNavigate()
  const clickHandler = () => {
    nav('/login')
  }

  return( <div>
    <h1>You must be Logged in to do this or commit this action</h1>
    <button className='bg-blue-500' onClick={clickHandler}>Navigate to Login</button>
  </div> )
}

export default MustLogin
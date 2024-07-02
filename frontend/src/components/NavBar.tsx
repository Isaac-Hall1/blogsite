function NavBar(){
    return(
        <div className="nav">
            <ul className="navElements">
                <li className="Home">
                    <a href='http://localhost:5173/home'>Home</a>
                </li>
                <li className="postCreate">
                    <a href='http://localhost:5173/createblog'>Create Blog</a>
                </li>
                <li className="userPosts">
                    <a href='http://localhost:5173/myposts'>Your Posts</a>
                </li>
                <li>
                    <a href="#">User Settings</a>
                    <ul>
                        <li>
                            <a href="http://localhost:5173/register">Register</a>
                        </li>
                        <li>
                            <a href="http://localhost:5173/login">Login</a>
                        </li>
                        <li>
                            <a href="http://localhost:5173/logout">Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
export default NavBar
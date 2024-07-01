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
            </ul>
        </div>
    );
}
export default NavBar
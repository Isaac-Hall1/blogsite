function NavBar(){
    return(
        <div className="flex items-center">
            <div className="text-white mr-6">
             <span className="font-semibold text-xl tracking-tight">Blogsite</span>
            </div>
            <div className=" flex flex-grow items-center">
                <div className="flex flex-initial text-sm flex-grow">
                    <a href='http://localhost:5173/' className=" focus:text-teal-600  inline-block mt-0 text-teal-200 hover:text-white mr-4">Home</a>
                    <a href='http://localhost:5173/createblog' className="  focus:text-teal-600 inline-block mt-0 text-teal-200 hover:text-white mr-4">Create Blog</a>
                    <a href='http://localhost:5173/myposts' className="  focus:text-teal-600 inline-block mt-0 text-teal-200 hover:text-white mr-4">Your Posts</a>
                </div>
                <div className="max-w-lg mx-auto">
                    <details className="open:ring-1 open:ring-slate-900 open:shadow-lg p-3 rounded-lg" >
                        <summary className=" hover:text-white text-teal-200 hover:cursor-pointer text-sm leading-6 open:text-teal-600 font-semibold select-none">
                            User Settings
                        </summary>
                        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            <ul className="list-none lg:flex lg:items-center">
                                <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 lg:mr-6">
                                    <a href="http://localhost:5173/register">Register</a>
                                </li>
                                <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 lg:mr-6">
                                    <a href="http://localhost:5173/login">Login</a>
                                </li>
                                <li className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                                    <a href="http://localhost:5173/logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    );
}
export default NavBar
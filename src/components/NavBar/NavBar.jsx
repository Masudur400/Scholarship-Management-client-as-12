import { useEffect, useState } from "react";
import { MdLightMode, MdLogout, MdNightlight } from "react-icons/md";
import logo from '../../assets/images/scholarships-bg-3.png';
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const NavBar = () => {
    const { user, logOut } = useAuth()

    const links = <>
        <li> <NavLink to='/' className={({ isActive }) => isActive ? 'btn btn-sm text-yellow-600 underline font-bold' : ''}>Home</NavLink></li>
        <li> <NavLink to='/allScholarShip' className={({ isActive }) => isActive ? 'btn btn-sm text-yellow-600 underline font-bold' : ''}>All Scholarship</NavLink></li>
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
    </>



    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");


    const handelToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);


    // profile links
    const profileLinks = <>
        {user && <div><li><p className="font-bold flex justify-center items-center">{user?.displayName}</p></li>
            <li><p className="flex justify-center items-center">{user?.email}</p></li>
        </div>}
        <div className="divider my-0"></div>

        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/dashboard/dashboardProfile">DashBoard</Link></li>
        <li><p onClick={handleLogOut} className="flex font-bold">Logout <MdLogout></MdLogout></p></li>
    </>

    return (
        <div className="shadow-lg fixed z-10 w-full top-0 px-4">
            <div className="navbar bg-base-100 container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 md:h-8 md:w-8 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>

                    <img className="w-20 h-10 md:12 border-yellow-600 md:border rounded-full md:w-32 ml-2 md:ml-4 " src={logo} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            //  <div className="flex gap-3">

                            //     <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            //         <img className="max-sm:h-7 max-sm:w-7 w-12 h-12 border rounded-full bg-white" alt="user image" referrerPolicy="no-referrer" src={user?.photoURL}
                            //         />
                            //     </div>
                            //     <button onClick={handleLogOut} className="btn max-sm:btn-xs font-bold my-auto">Log Out</button> </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button"  >
                                    <div>
                                        <img className="max-sm:h-10 max-sm:w-10 w-12 h-12 border rounded-full bg-white" alt="user image" referrerPolicy="no-referrer" src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                    {profileLinks}
                                </ul>
                            </div>

                            : <div className="flex gap-2 md:gap-4">
                                <Link to='/login' className="btn bg-yellow-600 hover:bg-yellow-700 text-white max-sm:btn-xs font-bold ">Login</Link>
                            </div>
                    }

                </div>

                <div className="ml-2 md:ml-3">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input
                            onChange={handelToggle} checked={theme === 'light' ? false : true}
                            type="checkbox" />

                        {/* sun icon */}
                        <svg className="swap-off fill-current max-sm:w-8 max-sm:h-8 w-10 h-10"><MdLightMode className="text-3xl md:text-4xl"></MdLightMode></svg>

                        {/* moon icon */}
                        <svg className="swap-on fill-current max-sm:w-8 max-sm:h-8 w-10 h-10"><MdNightlight className="text-3xl md:text-4xl"></MdNightlight></svg>

                    </label>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
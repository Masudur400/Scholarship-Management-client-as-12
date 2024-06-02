import { Helmet } from "react-helmet";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {

    const links = <>
        {/* Admin rout  */}
        <li><NavLink to="/dashboard/dashboardProfile" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Profile</NavLink></li>
        <li><NavLink to="/dashboard/users" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Manage Users</NavLink></li>
        <li><NavLink to="/dashboard/addScholarship" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Add Scholarship</NavLink></li>

<div className="divider my-2"></div>

        <li><NavLink to="/" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 font-bold btn btn-sm border-none' : ''} ><FaHome></FaHome> Home</NavLink></li>
        
         
        {/* moderator rout */}

        {/* user rout  */}
    </>

    return (
        <div className="flex gap-2">
            <Helmet>
                <title>SM || Dashboard</title>
            </Helmet>
            <div className="w-60 min-h-screen text-white bg-yellow-600 p-2">
                <ul className="menu">
                {links}
                </ul>
            </div>
            <div className="  w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
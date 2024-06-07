import { Helmet } from "react-helmet";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import DashBoardNav from "./DashBoardNav";

const DashBoard = () => {

//     const links = <>
//         {/* Admin rout  */}
//         <li><NavLink to="/dashboard/dashboardProfile" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Profile</NavLink></li>
        
//         <li><NavLink to="/dashboard/myApplication" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >My Application</NavLink></li>

//         <li><NavLink to="/dashboard/users" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Manage Users</NavLink></li>

//         <li><NavLink to="/dashboard/addScholarship" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Add Scholarship</NavLink></li>
        
//         <li><NavLink to="/dashboard/manageScholarship" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 md:font-bold btn btn-sm border-none' : ''} >Manage Scholarship</NavLink></li>

// <div className="  my-2 border-b-2 border-black"></div>

//         <li><NavLink to="/" className={({ isActive }) => isActive ? '  text-white bg-yellow-500 hover:bg-yellow-400 font-bold btn btn-sm border-none' : ''} ><FaHome></FaHome> Home</NavLink></li>
        
         
//         {/* moderator rout */}

//         {/* user rout  */}
//     </>

    return (
        <div className="">
            <Helmet>
                <title>SM || Dashboard</title>
            </Helmet>
            <div>
                <DashBoardNav></DashBoardNav>
            </div>
            {/* <div className="w-60 min-h-screen text-white bg-yellow-600 p-2">
                <ul className="menu">
                {links}
                </ul>
            </div> */}
            <div className="">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
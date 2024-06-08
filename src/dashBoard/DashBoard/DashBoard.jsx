import { Helmet } from "react-helmet"; 
import DashBoardNav from "./DashBoardNav";
import { Outlet } from "react-router-dom";

const DashBoard = () => { 

    return (
        <div className="">
            <Helmet>
                <title>SM || Dashboard</title>
            </Helmet>
            <div>
                <DashBoardNav></DashBoardNav>
            </div> 
            <div className="">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
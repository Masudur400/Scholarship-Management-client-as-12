import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

 
const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
           <div className="container my-20 mx-auto px-4 md:px-9 min-h-[calc(100vh-250px)]">
           <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;
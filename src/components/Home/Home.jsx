import { Helmet } from "react-helmet";
import Carosel from "../Slider/Carosel";

 
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SM || Home</title>
            </Helmet>
         <div>
         <Carosel></Carosel>
         </div>
        </div>
    );
};

export default Home;
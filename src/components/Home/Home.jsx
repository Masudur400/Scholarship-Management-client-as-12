import { Helmet } from "react-helmet";
import Carosel from "../Slider/Carosel";
import MostRankingScholarship from "../MostRankingScholarship/MostRankingScholarship";

 
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SM || Home</title>
            </Helmet>
            
         <div>
         <Carosel></Carosel>
         </div>
         <div>
                <MostRankingScholarship></MostRankingScholarship>
            </div>
        </div>
    );
};

export default Home;
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import SingleScholarship from "./SingleScholarship";

 
const MostRankingScholarship = () => {

    const axiosPublic = useAxiosPublic()
    const [sortedScholarship, setSortedScholarship] = useState([]);

    const {data : scholarships =[]}=useQuery({
        queryKey:['scholarships'],
        queryFn:async () =>{
            const res = await axiosPublic.get('/scholarships')
            return (res.data)
        }
    }) 

  useEffect(() => {
    const sorted = scholarships?.sort((a, b) => a.universityWorldRank - b.universityWorldRank);
    setSortedScholarship(sorted);
  }, [scholarships]);

  const sortedTopRankingScholarship = sortedScholarship?.slice(0,6)

    
    // Top Scholarship

    return (
        <div>
             <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-10">Top Ranking Scholarship</h3>
             <div className="md:w-2/3 mx-auto text-center">
                <p>The Top Ranking Scholarship is awarded to students who have demonstrated exceptional academic performance, typically ranking at the top of their class or achieving the highest scores in standardized examinations. This scholarship aims to alleviate the financial burden of higher education and encourage scholarly excellence.</p>
             </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
             {
                sortedTopRankingScholarship?.map(scholarship => <SingleScholarship key={scholarship._id} scholarship={scholarship}></SingleScholarship>)
             }
        </div>
        </div>
    );
};

export default MostRankingScholarship;
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Scholarship from "./Scholarship";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";


const AllScolarShip = () => {

    const [query , setQuery] = useState('')
    const [filteredData, setFilteredData] = useState([]) 

    const axiosSecure = useAxiosSecure()

    const { data: scholarships = [], isPending} = useQuery({
        queryKey: ['scholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/scholarships') 
            return res.data
        }
    })
    // const {_id,postDate, applicationDeadline, scholarshipName, universityCountry, universityName,  subjectCategory, degree, image} = scholarship

    useEffect(()=>{
        if(query === ''){
            setFilteredData(scholarships) 
        } 
        else{
            const filterData = scholarships.filter(item => item.degree.toLowerCase().includes(query) ||  item.scholarshipName.toLowerCase().includes(query) || item.universityName.toLowerCase().includes(query) || item.subjectCategory.toLowerCase().includes(query) || item.universityCountry.toLowerCase().includes(query) ) 
            setFilteredData(filterData)
        }   
         
    },[query, scholarships])
    

    const handleSearch = e =>{
        e.preventDefault()
        const searchText = e.target.search.value.toLowerCase()
        setQuery(searchText) 
        console.log(searchText)
    }

if(isPending){
    return <Loading></Loading>
}

    return (
        <div className="my-10">
            <Helmet>
                <title>SM || All Scholarship</title>
            </Helmet>
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-5">All Scholarship</h3>
            <form onSubmit={handleSearch} className="my-5">
                <div className="flex md:w-2/4 mx-auto">
                <input type="search" name="search" id="" placeholder="Search" className="border-2 border-yellow-500 rounded-l-md w-full px-4 py-2 mb-2" />
                <input type="submit" value="Search" className="rounded-r-md  bg-yellow-500 text-white font-bold px-4 py-2 mb-2"/>
                </div> 
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredData.map(scholarship => <Scholarship key={scholarship._id} scholarship={scholarship}></Scholarship>)
                }
            </div>

        </div>
    );
};

export default AllScolarShip;
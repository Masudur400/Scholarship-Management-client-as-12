import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

 
const SingleScholarship = ({scholarship}) => {

    const {_id,postDate, applicationDeadline, scholarshipName, universityCountry, universityName,  subjectCategory, degree, image,universityWorldRank} = scholarship

    return (
        <div className="shadow-lg p-4 flex flex-col group border rounded-md">
             <div className="flex justify-center mb-3">
                <img className="w-80 h-56 group-hover:scale-105" src={image} alt="" />
             </div>
             <div className="flex-grow space-y-2 font-bold">
                <p>Scholarship Name : {scholarshipName}</p>
                <p>University Name : {universityName}</p>
                <p>University Country : {universityCountry}</p>
                <p>Subject Category : {subjectCategory}</p>
                <div>
                    <p>PostDate :  {postDate}</p>
                    <p>Deadline : {applicationDeadline}</p>
                    <p>University Rank : <span className="text-red-500">{universityWorldRank} number in the world</span> </p>
                </div>
                <p>Degree : {degree}</p>
             </div>
             <p className="border-b-2 border-yellow-500 my-2"></p>
             <div className=" flex justify-center">
            <Link to={`/scholarship/${_id}`}> <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md my-3 text-white font-bold">Details</button></Link>
             </div>
        </div>
    );
};

SingleScholarship.propTypes ={
    scholarship:PropTypes.object
}

export default SingleScholarship;
import PropTypes from "prop-types"
import { Link } from "react-router-dom";



const Scholarship = ({scholarship}) => {

    const {_id,postDate, applicationDeadline, postedUserEmail, scholarshipName, universityCity, universityCountry, universityName, universityWorldRank, subjectCategory,  scholarshipCategory, degree, applicationFees, serviceCharge, image} = scholarship

    return (
        <div className="shadow-lg p-4 flex flex-col">
             <div className="flex justify-center mb-3">
                <img className="w-80 h-56" src={image} alt="" />
             </div>
             <div className="flex-grow space-y-2 font-bold">
                <p>Scholarship Name : {scholarshipName}</p>
                <p>University Name : {universityName}</p>
                <p>University Country : {universityCountry}</p>
                <p>Subject Category : {subjectCategory}</p>
                <div>
                    <p>PostDate :  {postDate}</p>
                    <p>Deadline : {applicationDeadline}</p>
                </div>
                <p>Degree : {degree}</p>
             </div>
             <div className=" flex justify-center">
            <Link to={`/scholarship/${_id}`}> <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md my-3 text-white font-bold">Details</button></Link>
             </div>
        </div>
    );
};

Scholarship.propTypes ={
    scholarship:PropTypes.object
}

export default Scholarship;
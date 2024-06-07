


const MyApplicationDesign = ({application, idx}) => {

const {applicantPhoneNumber,applicationFees,serviceCharge,totalFee,applicantUniversityName,applicantAddress,applicantName,scholarshipName,applicantScholarshipCategory,gender,universityCity,universityCountry,universityImage,applicantSubjectCategory,applicantDegree,SSCresult,HSCresult,UserEmail,userName,status,applicantImage,normalDate} = application

    return (
         <>
            
            <tr>
            <td> {idx + 1} </td>
            <td> University Name: {applicantUniversityName} </td>
                <td>
                    <p>
                    University Country: {universityCountry}
                    </p>
                    <p>
                    University City: {universityCity}
                    </p>
                </td>
                <td>Application Feedback </td>
                <td>
                    <p>
                        Subject Category: {applicantSubjectCategory}
                    </p>
                    <p>
                        Applied Degree: {applicantDegree}
                    </p>
                </td>
                <td>
                    <p>
                        Application Fees: {applicationFees}
                    </p>
                    <p>
                        Service charge: {serviceCharge}
                    </p>
                </td>
                <td>Application Status: {status}</td>
                <td>action</td>
            </tr>
            </>
        
    );
};

export default MyApplicationDesign;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure"; 
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


const AllAppliedScholarship = () => {

    const axiosSecure = useAxiosSecure()
    const [applyData, setApplyData] = useState({})
    const [feedBacka, setFeedBacka] = useState({})
    const { data: allApplies = [], refetch } = useQuery({
        queryKey: ['applies'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applies')
            return res.data
        }
    })

    // status data 
    const handleStatusData = apply => {
        setApplyData(apply)
    }

    // status change 
    const handleStatus = async (e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const status = form.get('status');

        try {
            const data = { applicantName: applyData?.applicantName, applicantPhoneNumber: applyData?.applicantPhoneNumber, applicantUniversityName: applyData?.applicantUniversityName, applicantAddress: applyData?.applicantAddress, gender: applyData?.gender, applicantSubjectCategory: applyData?.applicantSubjectCategory, applicantScholarshipCategory: applyData?.applicantScholarshipCategory, applicantDegree: applyData?.applicantDegree, SSCresult: applyData?.SSCresult, HSCresult: applyData?.HSCresult, status: status, feedBack: applyData?.feedBack, applicantImage: applyData?.applicantImage }


            const res = await axiosSecure.patch(`/applies/${applyData?._id}`, data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "success !",
                    text: `status update successfully !`,
                    icon: "success"
                });

            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
        document.getElementById("my_modal_3").close();
    }


    // feedBack data 
    const handleFeedBackData = apply => {
        setFeedBacka(apply)
    }

    //    give feedBack 
    const handleFeedBack = async (e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const feedBack = form.get('feedBack');

        try {
            const data = { applicantName: feedBacka?.applicantName, applicantPhoneNumber: feedBacka?.applicantPhoneNumber, applicantUniversityName: feedBacka?.applicantUniversityName, applicantAddress: feedBacka?.applicantAddress, gender: feedBacka?.gender, applicantSubjectCategory: feedBacka?.applicantSubjectCategory, applicantScholarshipCategory: feedBacka?.applicantScholarshipCategory, applicantDegree: feedBacka?.applicantDegree, SSCresult: feedBacka?.SSCresult, HSCresult: feedBacka?.HSCresult, status: feedBacka?.status, feedBack: feedBack, applicantImage: feedBacka?.applicantImage }


            const res = await axiosSecure.patch(`/applies/${feedBacka?._id}`, data)
            if (res.data.modifiedCount > 0) {
                refetch()
                Swal.fire({
                    title: "success !",
                    text: `feedBack successfully !`,
                    icon: "success"
                });

            }

        } catch (error) {
            console.error('Error uploading the image or submitting the form:', error);
        }
        document.getElementById("my_modal_5").close();
    }


    // delete
    const handleDeleteApply = apply => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete applied...!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) { 
                axiosSecure.delete(`/applies/${apply?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) { 
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: ` applied has been deleted.`,
                                icon: "success"
                            });
                             
                        }
                    })
            }
        });
    }


    return (
        <div className="md:px-6 m-5">
            <h3 className="text-lg md:text-2xl font-bold text-yellow-500 text-center my-3">All Applied Scholarship</h3>
            <div className="md:w-1/5 mx-auto border border-yellow-500 my-2"></div>
            <div className="overflow-x-auto min-h-screen">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>

                            <td>#</td>
                            <td>UniversityName</td>
                            <td>University country & city</td>
                            <td>Subject & degree</td>
                            <td>Application fees & charge</td>
                            <td>FeedBack</td>
                            <td>Application Status</td>
                            <td className="text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Array.isArray(allApplies) && allApplies.length > 0 ?
                            allApplies?.map((apply, idx) => <tr key={apply._id} className='hover:shadow-md'>
                                <td> {idx + 1} </td>
                                <td> University Name: {apply?.applicantUniversityName} </td>
                                <td>
                                    <p>
                                        University Country: {apply?.universityCountry}
                                    </p>
                                    <p>
                                        University City: {apply?.universityCity}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        Subject Category: {apply?.applicantSubjectCategory}
                                    </p>
                                    <p>
                                        Applied Degree: {apply?.applicantDegree}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        Application Fees: {apply?.applicationFees} $
                                    </p>
                                    <p>
                                        Service charge: {apply?.serviceCharge} $
                                    </p>
                                </td>

                                <td onClick={() => handleFeedBackData(apply)}><button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-sm">FeedBack</button></td>

                                <td onClick={() => handleStatusData(apply)}><button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-sm">{apply?.status}</button></td>

                                <td className='space-y-3 flex flex-col'>

                                    <Link to={`/dashboard/details/${apply?._id}`}><button className=" px-4 py-2 rounded-md  text-white bg-yellow-500 hover:bg-yellow-600">Details</button></Link>

                                    <button
                                         onClick={()=>handleDeleteApply(apply)}
                                        className=" px-4 py-2 rounded-md  text-white bg-yellow-500 hover:bg-yellow-600">Cancel</button>

                                </td>
                            </tr>): ''
                        }

                    </tbody>
                </table>
            </div>
            {/* modal feedBack  */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form
                    onSubmit={handleFeedBack}
                    className="modal-box">
                    <div >
                        <h2 className="font-bold text-yellow-500 text-center">FeedBack</h2>
                        <div>
                            <p>Write Your FeedBack</p>
                            <input defaultValue={feedBacka?.feedBack} className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="feedBack" placeholder="FeedBack" id="" required />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn  bg-red-500 hover:bg-red-600 text-white font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                    <input type="submit" value='Next' className="btn -mt-12 bg-yellow-500 hover:bg-yellow-600 text-white font-bold absolute" />
                </form>
            </dialog>

            {/* status Modal  */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form
                        onSubmit={handleStatus}
                    >
                        <h2 className="font-bold text-yellow-500 text-center">Status</h2>
                        <div>
                            <p>Change Status</p>
                            <select name='status' className="border-2 rounded-md w-full px-4 py-2 mb-2" >
                                <option disabled selected>Select One</option>
                                <option value="pending">pending</option>
                                <option value="processing">processing</option>
                                <option value="completed">completed</option>
                            </select>
                        </div>
                        <input type="submit" value='Next' className="btn bg-yellow-500 hover:bg-yellow-600 text-white font-bold " />
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default AllAppliedScholarship;
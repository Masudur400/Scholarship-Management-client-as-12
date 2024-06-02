import useAuth from "../../components/Hooks/useAuth";

const AddScholarShip = () => {

    const { user } = useAuth();


    const handleAddScholarship = e => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const scholarshipName = form.get('scholarshipName')
        const universityName = form.get('universityName')
        const universityCountry = form.get('universityCountry')
        const universityCity = form.get('universityCity')
        const universityWorldRank = form.get('universityWorldRank')
        const subjectCategory = form.get('subjectCategory')
        const scholarshipCategory = form.get('scholarshipCategory')
        const degree = form.get('degree')
        const applicationFees = form.get('applicationFees')
        const serviceCharge = form.get('serviceCharge')

        const data = {scholarshipName,universityCity,universityCountry,universityName,universityWorldRank,subjectCategory,scholarshipCategory,degree,applicationFees,serviceCharge}
        console.table(data)
         
    }

    return (
        <div className="my-10 mx-5">
            <div className="w-4/5 p-5 mx-auto bg-slate-100">
                <form onSubmit={handleAddScholarship} >
                    <div className="grid md:grid-cols-2 gap-2">
                        <div>
                            <p>Scholarship Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="scholarshipName" placeholder="Scholarship Name" id="scholarshipName" />
                        </div>
                        <div>
                            <p>University Name</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityName" placeholder="University Name" id="universityName" />
                        </div>
                        <div>
                            <p> University Country</p>
                            <select name='universityCountry' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Japan">Japan</option>
                                <option value="Australia">Australia</option>
                                <option value="Canada">Canada</option>
                            </select>
                        </div>
                        <div>
                            <p> University city</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityCity" placeholder="University City" id="universityCity" />
                        </div>
                        <div>
                            <p> University World rank</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="text" name="universityWorldRank" placeholder="University World rank" id="universityWorldRank" />
                        </div>
                        <div>
                            <p> Subject category</p>
                            <select name='subjectCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                        <div>
                            <p> Scholarship category</p>
                            <select name='scholarshipCategory' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="Full fund">Full fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self fund">Self fund</option>
                            </select>
                        </div>
                        <div>
                            <p> Degree</p>
                            <select name='degree' className="border-2 rounded-md w-full px-4 py-2 mb-2">
                                <option disabled selected>Select One</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="masters">masters</option>
                            </select>
                        </div>
                        <div>
                            <p> Application fees</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="applicationFees" placeholder="Application fees" id="applicationFees" />
                        </div>
                        <div>
                            <p> Service charge</p>
                            <input className="border-2 rounded-md w-full px-4 py-2 mb-2" type="number" name="serviceCharge" placeholder="Service charge" id="serviceCharge" />
                        </div>
                    </div>


                   <div className="flex justify-center my-5 font-bold">
                   <input type="submit" value="Add Scholarship" className="px-4 py-3 text-white rounded-md bg-yellow-600" />
                   </div>
                </form>
            </div>
        </div>
    );
};

export default AddScholarShip;
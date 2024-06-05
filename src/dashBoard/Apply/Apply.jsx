import { useLoaderData } from "react-router-dom";

 
const Apply = () => {

    const applyShip = useLoaderData()
    console.log(applyShip)

    return (
        <div className="mt-10 mx-3">
            apply
        </div>
    );
};

export default Apply;
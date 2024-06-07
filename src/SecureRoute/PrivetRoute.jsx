 
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/Hooks/useAuth";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types';

 
const PrivetRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return  <Loading></Loading>
    }
    if(user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

PrivetRoute.propTypes = {
    children: PropTypes.node
}

export default PrivetRoute;
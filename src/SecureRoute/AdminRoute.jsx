import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../components/Hooks/useAdmin";
import useAuth from "../components/Hooks/useAuth";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types'

 
const AdminRoute = ({children}) => {
    const [isAdmin , isPending] = useAdmin()
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading || isPending) {
        return  <Loading></Loading>
    }

    if(user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

AdminRoute.propTypes ={
    children:PropTypes.children
}

export default AdminRoute;
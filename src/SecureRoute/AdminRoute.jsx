import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../components/Hooks/useAdmin";
import useAuth from "../components/Hooks/useAuth";
import Loading from "../components/Loading/Loading";
import PropTypes from 'prop-types'
import useModerator from "../components/Hooks/useModerator";

 
const AdminRoute = ({children}) => {
    const [isAdmin , isAdminLoading] = useAdmin()
    const [isModerator, isModeratorLoading] = useModerator()
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return  <Loading></Loading>
    }

    if(user && isAdmin || isModerator) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

AdminRoute.propTypes ={
    children:PropTypes.node
}

export default AdminRoute;
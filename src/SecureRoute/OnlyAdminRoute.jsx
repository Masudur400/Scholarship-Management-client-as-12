import PropTypes from 'prop-types' 
import useAdmin from '../components/Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../components/Hooks/useAuth';
import Loading from '../components/Loading/Loading';


const OnlyAdminRoute = ({children}) => {
    const [isAdmin , isAdminLoading] = useAdmin() 
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading ) {
        return  <Loading></Loading>
    }

    if(user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

OnlyAdminRoute.propTypes ={
    children:PropTypes.node
}


export default OnlyAdminRoute;
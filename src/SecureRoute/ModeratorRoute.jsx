 
import PropTypes from 'prop-types'
import useModerator from '../components/Hooks/useModerator';
import useAuth from '../components/Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';


const ModeratorRoute = ({children}) => {
    const [isModerator , isPending] = useModerator()
    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading || isPending) {
        return  <Loading></Loading>
    }

    if(user && isModerator) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>
};

ModeratorRoute.propTypes ={
    children:PropTypes.children
}

export default ModeratorRoute;
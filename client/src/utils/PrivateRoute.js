import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({children, ...rest}) => {
    let { isAuthenticated } = useSelector((state) => state.auth)

    return !isAuthenticated ? <Navigate to='/login'/> : children;
}

export default PrivateRoute;

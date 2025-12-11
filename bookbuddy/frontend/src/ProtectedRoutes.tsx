import {
    Outlet,
    Navigate
} from 'react-router-dom'

const ProtectedRoutes = () => {
    return (
        localStorage.getItem("accountId") ?
            <Outlet /> :
            <Navigate to="/" />
    )
}

export default ProtectedRoutes
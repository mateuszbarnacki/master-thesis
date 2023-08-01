import {localStorageAuthToken} from "../constants";
import {Navigate} from "react-router-dom";

function AdminRoute({ children }) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem('roles') ?
        window.localStorage.getItem('roles') : [];
    return isLogged && roles.includes('ADMIN') ? children : <Navigate to={'/'}/>;
}

export default AdminRoute;

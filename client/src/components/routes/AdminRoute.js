import {localStorageAuthToken, localStorageRoles} from "../../api/constants";
import {loginView} from "../../api/views";
import {AdminRole} from "../../api/roles";
import {Navigate} from "react-router-dom";

function AdminRoute({children}) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
    return isLogged && roles.includes(AdminRole) ? children : <Navigate to={loginView}/>;
}

export default AdminRoute;

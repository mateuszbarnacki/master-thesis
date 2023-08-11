import {localStorageAuthToken, localStorageRoles, AdminRole} from "../../api/constants";
import {loginPage} from "../../api/paths";
import {Navigate} from "react-router-dom";

function AdminRoute({children}) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
    return isLogged && roles.includes(AdminRole) ? children : <Navigate to={loginPage}/>;
}

export default AdminRoute;

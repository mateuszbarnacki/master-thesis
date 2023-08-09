import * as C from "../../api/constants";
import {Navigate} from "react-router-dom";

function ProjectCreatorRoute({children}) {
    const isLogged = !!window.localStorage.getItem(C.localStorageAuthToken);
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    return isLogged && (roles.includes(C.ProjectCreatorRole) || roles.includes(C.AdminRole)) ?
        children : <Navigate to={'/'}/>;
}

export default ProjectCreatorRoute;
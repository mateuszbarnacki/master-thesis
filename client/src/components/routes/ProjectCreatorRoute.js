import {localStorageRoles, localStorageAuthToken} from "../../api/constants";
import {loginView} from "../../api/views";
import {AdminRole, ProjectCreatorRole} from "../../api/roles";
import {Navigate} from "react-router-dom";

function ProjectCreatorRoute({children}) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
    return isLogged && (roles.includes(ProjectCreatorRole) || roles.includes(AdminRole)) ?
        children : <Navigate to={loginView}/>;
}

export default ProjectCreatorRoute;
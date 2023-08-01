import {localStorageAuthToken} from "../constants";
import {Navigate} from "react-router-dom";

function ProjectCreatorRoute({children}) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem('roles') ?
        window.localStorage.getItem('roles') : [];
    return isLogged && (roles.includes('PROJECT_CREATOR') || roles.includes('ADMIN')) ?
        children : <Navigate to={'/'}/>;
}

export default ProjectCreatorRoute;
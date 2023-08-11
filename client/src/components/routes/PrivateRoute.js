import {Navigate} from "react-router-dom";
import {localStorageAuthToken} from "../../api/constants";
import {loginPage} from "../../api/paths";

function PrivateRoute({ children }) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    return isLogged ? children : <Navigate to={loginPage}/>;
}

export default PrivateRoute;


import {Navigate} from "react-router-dom";
import {localStorageAuthToken} from "../../api/constants";

function PrivateRoute({ children }) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    return isLogged ? children : <Navigate to={'/'}/>;
}

export default PrivateRoute;


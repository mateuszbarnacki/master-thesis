import {Navigate} from "react-router-dom";
import {localStorageAuthToken} from "../../api/constants";
import {loginView} from "../../api/views";

function PrivateRoute({ children }) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    return isLogged ? children : <Navigate to={loginView}/>;
}

export default PrivateRoute;


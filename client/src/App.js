import {Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectView from "./components/project/ProjectView";
import UserView from "./components/user/UserView";
import AddProjectView from "./components/project/addProject/AddProjectView";
import LoginView from "./components/login/LoginView";
import {localStorageAuthToken} from "./api/constants";

function App() {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    return (
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            {isLogged ? <Route path="/list" element={<ProjectView/>}/> : null}
            {isLogged ? <Route path="/add" element={<AddProjectView/>}/> : null}
            {isLogged ? <Route path="/users" element={<UserView/>}/> : null}
        </Routes>
    );
}

export default App;
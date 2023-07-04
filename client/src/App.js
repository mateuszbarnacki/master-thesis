import {Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectView from "./components/project/ProjectView";
import UserView from "./components/user/UserView";
import AddProjectView from "./components/project/addProject/AddProjectView";
import LoginView from "./components/login/LoginView";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            <Route path="/list" element={<ProjectView/>}/>
            <Route path="/add" element={<AddProjectView/>}/>
            <Route path="/users" element={<UserView/>}/>
        </Routes>
    );
}

export default App;
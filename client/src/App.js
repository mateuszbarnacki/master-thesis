import {Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectView from "./components/project/ProjectView";
import UserView from "./components/user/UserView";
import AddProjectView from "./components/project/addProject/AddProjectView";
import LoginView from "./components/login/LoginView";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProjectCreatorRoute from "./components/routes/ProjectCreatorRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginView/>}/>
            <Route path="/list" element={<PrivateRoute><ProjectView/></PrivateRoute>}/>
            <Route path="/add" element={<ProjectCreatorRoute><AddProjectView/></ProjectCreatorRoute>}/>
            <Route path="/users" element={<AdminRoute><UserView/></AdminRoute>}/>
        </Routes>
    );
}

export default App;
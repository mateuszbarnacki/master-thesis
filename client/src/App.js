import {Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectPage from "./components/project/ProjectPage";
import UserPage from "./components/user/UserPage";
import AddProjectPage from "./components/project/addProject/AddProjectPage";
import LoginPage from "./components/login/LoginPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/list" element={<ProjectPage/>}/>
            <Route path="/add" element={<AddProjectPage/>}/>
            <Route path="/users" element={<UserPage/>}/>
        </Routes>
    );
}

export default App;
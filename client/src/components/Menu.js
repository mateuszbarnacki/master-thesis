import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";
import logo from '../assets/agh_logo.jpg';
import './styles.css';
import {Fragment} from "react";
import {localStorageAuthToken, localStorageRoles} from "../api/constants";
import {AdminRole, ProjectCreatorRole} from "../api/roles";

function Menu() {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
    const unauthorizedOptions = (
        <Nav className="me-auto">
        </Nav>
    );
    const authorizedOptions = (
        <Nav className="me-auto">
            <NavLink href="/list">Lista projektów</NavLink>
            {roles.includes(ProjectCreatorRole) || roles.includes(AdminRole) ?
                <NavLink href="/add">Dodaj projekt</NavLink> : null}
            {roles.includes(AdminRole) ? <NavLink href="/users">Użytkownicy</NavLink> : null}
            <NavLink href="/"
                     onClick={() => window.localStorage.removeItem(localStorageAuthToken)}>
                Wyloguj się
            </NavLink>
        </Nav>
    );

    return (
        <Navbar bg="dark" variant="dark">
            <Fragment>
                <NavbarBrand>
                    <img src={logo} className="Logo" alt="AGH"/>
                </NavbarBrand>
                {isLogged ? authorizedOptions : unauthorizedOptions}
            </Fragment>
        </Navbar>
    );
}

export default Menu;
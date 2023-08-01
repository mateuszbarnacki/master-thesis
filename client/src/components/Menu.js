import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";
import logo from '../assets/agh_logo.jpg';
import './styles.css';
import {Fragment} from "react";
import * as C from "../api/constants";

function Menu() {
    const isLogged = !!window.localStorage.getItem(C.localStorageAuthToken);
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    const unauthorizedOptions = (
        <Nav className="me-auto">
        </Nav>
    );
    const authorizedOptions = (
        <Nav className="me-auto">
            <NavLink href="/list">Lista projektów</NavLink>
            {roles.includes(C.ProjectCreatorRole) || roles.includes(C.AdminRole) ?
                <NavLink href="/add">Dodaj projekt</NavLink> : null}
            {roles.includes(C.AdminRole) ? <NavLink href="/users">Użytkownicy</NavLink> : null}
            <NavLink href="/"
                     onClick={() => window.localStorage.removeItem(C.localStorageAuthToken)}>Wyloguj
                się</NavLink>
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
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";
import logo from '../assets/agh_logo.jpg';
import './styles.css';
import {Fragment} from "react";
import {localStorageAuthToken} from "../api/constants";

function Menu() {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const roles = !!window.localStorage.getItem('roles') ?
        window.localStorage.getItem('roles') : [];
    const unauthorizedOptions = (
        <Nav className="me-auto">
        </Nav>
    );
    const authorizedOptions = (
        <Nav className="me-auto">
            {roles.includes('READER') || roles.includes('ADMIN') ? <NavLink href="/list">Lista projektów</NavLink> : null}
            <NavLink href="/add">Dodaj projekt</NavLink>
            {roles.includes('ADMIN') ? <NavLink href="/users">Użytkownicy</NavLink> : null}
            <NavLink href="/" onClick={() => window.localStorage.removeItem(localStorageAuthToken)}>Wyloguj się</NavLink>
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
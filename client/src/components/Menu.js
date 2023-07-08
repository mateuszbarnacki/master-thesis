import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";
import logo from '../assets/agh_logo.jpg';
import './styles.css';
import {Fragment} from "react";
import {localStorageAuthToken} from "../api/constants";

function Menu(props) {
    const isLogged = !!window.localStorage.getItem(localStorageAuthToken);
    const unauthorizedOptions = (
        <Nav className="me-auto">
        </Nav>
    );
    const authorizedOptions = (
        <Nav className="me-auto">
            {props.canRead ? <NavLink href="/list">Lista projektów</NavLink> : null}
            {props.canAdd ? <NavLink href="/add">Dodaj projekt</NavLink> : null}
            <NavLink href="/users">Użytkownicy</NavLink>
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
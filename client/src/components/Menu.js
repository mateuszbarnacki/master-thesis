import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";
import logo from '../assets/agh_logo.jpg';
import './styles.css';

function Menu(props) {
    const unauthorizedOptions = (
        <Nav className="me-auto">
            <NavLink href="/login">Zaloguj się</NavLink>
        </Nav>
    );
    const authorizedOptions = (
        <Nav className="me-auto">
            {props.canRead ? <NavLink href="/list">Lista projektów</NavLink> : null}
            {props.canAdd ? <NavLink href="/add">Dodaj projekt</NavLink> : null}
            <NavLink href="/users">Użytkownicy</NavLink>
            <NavLink href="/">Wyloguj się</NavLink>
        </Nav>
    );

    return (
        <Navbar bg="dark" variant="dark">
            <>
                <NavbarBrand>
                    <img src={logo} className="Logo" alt="AGH"/>
                </NavbarBrand>
                {props.isLogged ? authorizedOptions : unauthorizedOptions}
            </>
        </Navbar>
    );
}

export default Menu;
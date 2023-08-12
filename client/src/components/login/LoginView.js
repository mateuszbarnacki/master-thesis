import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment, useState} from "react";
import Menu from "../Menu";
import LoginForm from "./LoginForm";
import {localStorageAuthToken, localStorageRoles, localStorageUser} from "../../api/constants";
import Footer from "../Footer";

function LoginView() {
    window.localStorage.removeItem(localStorageAuthToken);
    window.localStorage.removeItem(localStorageRoles);
    window.localStorage.removeItem(localStorageUser);
    const [loginError, setLoginError] = useState(false);
    const alert = (
        <Alert variant="danger" onClose={() => setLoginError(false)} dismissible>
            <Alert.Heading>Błąd logowania</Alert.Heading>
            Podczas logowania wystąpił nieoczekiwany błąd. Spróbuj ponownie.
        </Alert>
    );

    return (
        <Fragment>
            <Menu/>
            {loginError ? alert : null}
            <Container>
                <Row className="justify-content-center">
                    <LoginForm setLoginError={(value) => setLoginError(value)}/>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default LoginView;
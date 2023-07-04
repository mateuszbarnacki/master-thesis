import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment} from "react";
import Menu from "../Menu";
import LoginForm from "./LoginForm";

function LoginView() {
    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Container>
                <Row className="justify-content-center">
                    <LoginForm/>
                </Row>
            </Container>
        </Fragment>
    );
}

export default LoginView;
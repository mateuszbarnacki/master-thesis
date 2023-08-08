import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../Menu";
import {Fragment, useState} from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import Footer from "../Footer";
import Alert from "react-bootstrap/Alert";

function UserView() {
    const [isAlert, setIsAlert] = useState(false);
    const fetchAlert = (
        <Alert variant="danger" onClose={() => setIsAlert(false)} dismissible>
            <Alert.Heading>Błąd serwera</Alert.Heading>
            Podczas pobrania danych z serwera wystąpił nieoczekiwany błąd.
        </Alert>
    );

    return (
        <Fragment>
            <Menu/>
            {isAlert ? fetchAlert : null}
            <Container fluid className="mt-4">
                <Row className="m-5">
                    <Col className="m-1">
                        <UserList handleAlert={(value) => setIsAlert(value)}/>
                    </Col>
                    <Col className="m-1">
                        <UserForm handleAlert={(value) => setIsAlert(value)}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default UserView;
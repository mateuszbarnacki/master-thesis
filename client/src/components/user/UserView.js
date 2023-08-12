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
    const [alertMessage, setAlertMessage] = useState('');
    const alert = (
        <Alert variant="danger" onClose={() => {
            setAlertMessage('');
            setIsAlert(false);
        }} dismissible>
            <Alert.Heading>Błąd serwera</Alert.Heading>
            Podczas pobrania danych z serwera wystąpił nieoczekiwany błąd: {alertMessage}
        </Alert>
    );
    const showAlert = (message) => {
        setAlertMessage(message);
        setIsAlert(true);
    };

    return (
        <Fragment>
            <Menu/>
            {isAlert ? alert : null}
            <Container fluid className="mt-4">
                <Row className="m-5">
                    <Col className="m-1">
                        <UserList showAlert={(message) => showAlert(message)}/>
                    </Col>
                    <Col className="m-1">
                        <UserForm showAlert={(message) => showAlert(message)}/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default UserView;
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../Menu";
import {Fragment} from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import Footer from "../Footer";

function UserView(props) {
    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Container fluid className="mt-4">
                <Row className="m-5">
                    <Col className="m-1">
                        <UserList/>
                    </Col>
                    <Col className="m-1">
                        <UserForm/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default UserView;
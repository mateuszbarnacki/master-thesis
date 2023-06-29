import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment} from "react";
import Menu from "../Menu";
import ProjectCard from "./ProjectCard";
import ProjectList from "./ProjectList";

function ProjectPage() {
    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <Col>
                        <ProjectList/>
                    </Col>
                    <Col xs={8}>
                        <ProjectCard/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ProjectPage;
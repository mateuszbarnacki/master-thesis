import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment, useState} from "react";
import Menu from "../Menu";
import ProjectCard from "./ProjectCard";
import ProjectList from "./ProjectList";

const mock = [
    {
        name: 'proj1',
        description: 'Mój pierwszy projekt'
    },
    {
        name: 'pomiar powietrza',
        description: 'Projekt sprawdzający parametry atmosferyczne'
    },
    {
        name: 'proj352',
        description: "Projekt utworzony w ramach testu"
    },
    {
        name: 'Test',
        description: "Test generalny"
    },
    {
        name: 'pomiar zanieczyszczenia powietrza',
        description: 'Projekt sprawdzający stan jakości powietrza'
    },
    {
        name: 'pomiar',
        description: 'Projekt testujący pojedynczy pomiar'
    },
    {
        name: 'pomiar testowy',
        description: 'Projekt testujący mierzenie kilku wartości'
    },
    {
        name: 'pomiar2',
        description: 'Ostateczny test pomiarów'
    },
    {
        name: 'project',
        description: 'Projekt ostateczny'
    }
];

function ProjectPage() {
    const [projectInfoCard, setProjectInfoCard] = useState(<ProjectCard item={{name: 'Test', description: "Test generalny"}}/>);
    const handleListOnClick = (item) => {
        setProjectInfoCard(<ProjectCard item={item}/>);
    };

    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <Col>
                        <ProjectList projectsList={mock} handleListOnClick={handleListOnClick}/>
                    </Col>
                    <Col xs={8}>
                        {projectInfoCard}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ProjectPage;
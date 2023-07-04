import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
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
        description: 'Mój pierwszy projekt',
        sensors: [
            {
                id: "sensor1"
            },
            {
                id: "sensor2"
            },
            {
                id: "sensor3"
            }
        ]
    },
    {
        name: 'pomiar powietrza',
        description: 'Projekt sprawdzający parametry atmosferyczne',
        sensors: [
            {
                id: "sensor-1"
            },
            {
                id: "sensor-2"
            },
            {
                id: "sensor-3"
            }
        ]
    },
    {
        name: 'proj352',
        description: "Projekt utworzony w ramach testu",
        sensors: [
            {
                id: "Sensor1"
            },
            {
                id: "Sensor2"
            }
        ]
    },
    {
        name: 'Test',
        description: "Test generalny",
        sensors: [
            {
                id: "Sensor-1"
            },
            {
                id: "Sensor-2"
            },
            {
                id: "Sensor-3"
            }
        ]
    },
    {
        name: 'pomiar zanieczyszczenia powietrza',
        description: 'Projekt sprawdzający stan jakości powietrza',
        sensors: [
            {
                id: "Sensor-13"
            }
        ]
    },
    {
        name: 'pomiar',
        description: 'Projekt testujący pojedynczy pomiar',
        sensors: [
            {
                id: "sensor1"
            },
            {
                id: "sensor22"
            }
        ]
    },
    {
        name: 'pomiar testowy',
        description: '',
        sensors: [
            {
                id: "sensor1"
            }
        ]
    },
    {
        name: 'pomiar2',
        description: 'Ostateczny test pomiarów',
        sensors: [
            {
                id: "sensor1"
            },
            {
                id: "sensor2"
            },
            {
                id: "sensor3"
            },
            {
                id: "sensor7777"
            },
            {
                id: "sensor12"
            },
            {
                id: "sensor352"
            }
        ]
    },
    {
        name: 'project',
        description: 'Projekt ostateczny',
        sensors: [
            {
                id: "Sensor-4"
            },
            {
                id: "Sensor-13"
            }
        ]
    }
];

function ProjectPage() {
    const defaultCard = (
        <Card className="border-black m-3">
            <CardHeader as="h5">Karta zarządzania projektem</CardHeader>
            <Card.Body className="text-center">
                <Card.Title>Opis</Card.Title>
                <Card.Text>Po wybraniu projektu z listy znajdującej się w lewej części widoku
                    zostanie tutaj wyświetlony opis projektu oraz dostępne akcje</Card.Text>
            </Card.Body>
        </Card>
    );
    const [projectInfoCard, setProjectInfoCard] = useState(defaultCard);
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
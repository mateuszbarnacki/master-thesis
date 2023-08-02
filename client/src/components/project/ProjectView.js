import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment, useState} from "react";
import Menu from "../Menu";
import ProjectInfoCard from "./ProjectInfoCard";
import ProjectList from "./ProjectList";
import ProjectStructureCard from "./ProjectStructureCard";

const mock = [
    {
        name: 'proj1',
        description: 'Mój pierwszy projekt',
        sensors: [
            {
                deviceId: "sensor1",
                number: 13
            },
            {
                deviceId: "sensor2"
            },
            {
                deviceId: "sensor3"
            }
        ]
    },
    {
        name: 'pomiar powietrza',
        description: 'Projekt sprawdzający parametry atmosferyczne',
        sensors: [
            {
                deviceId: "sensor-1"
            },
            {
                deviceId: "sensor-2"
            },
            {
                deviceId: "sensor-3"
            }
        ]
    },
    {
        name: 'proj352',
        description: "Projekt utworzony w ramach testu",
        sensors: [
            {
                deviceId: "Sensor1"
            },
            {
                deviceId: "Sensor2"
            }
        ]
    },
    {
        name: 'Test',
        description: "Test generalny",
        sensors: [
            {
                deviceId: "Sensor-1"
            },
            {
                deviceId: "Sensor-2"
            },
            {
                deviceId: "Sensor-3"
            }
        ]
    },
    {
        name: 'pomiar zanieczyszczenia powietrza',
        description: 'Projekt sprawdzający stan jakości powietrza',
        sensors: [
            {
                deviceId: "Sensor-13"
            }
        ]
    },
    {
        name: 'pomiar',
        description: 'Projekt testujący pojedynczy pomiar',
        sensors: [
            {
                deviceId: "sensor1"
            },
            {
                deviceId: "sensor22"
            }
        ]
    },
    {
        name: 'pomiar testowy',
        description: '',
        sensors: [
            {
                deviceId: "sensor1"
            }
        ]
    },
    {
        name: 'pomiar2',
        description: 'Ostateczny test pomiarów',
        sensors: [
            {
                deviceId: "sensor1"
            },
            {
                deviceId: "sensor2"
            },
            {
                deviceId: "sensor3"
            },
            {
                deviceId: "sensor7777"
            },
            {
                deviceId: "sensor12"
            },
            {
                deviceId: "sensor352"
            }
        ]
    },
    {
        name: 'project',
        description: 'Projekt ostateczny',
        sensors: [
            {
                deviceId: "Sensor-4"
            },
            {
                deviceId: "Sensor-13"
            }
        ]
    }
];

function ProjectView() {
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
    const [projectStructureCard, setProjectStructureCard] = useState(null);
    const handleListOnClick = (item) => {
        setProjectInfoCard(<ProjectInfoCard item={item}/>);
        setProjectStructureCard(<ProjectStructureCard item={item}/>);
    };

    return (
        <Fragment>
            <Menu/>
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <Col>
                        <ProjectList projectsList={mock} handleListOnClick={handleListOnClick}/>
                    </Col>
                    <Col xs={8}>
                        {projectInfoCard}
                        {projectStructureCard}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ProjectView;
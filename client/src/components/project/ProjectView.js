import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment, useEffect, useState} from "react";
import Menu from "../Menu";
import ProjectInfoCard from "./ProjectInfoCard";
import ProjectStructureCard from "./ProjectStructureCard";
import Footer from "../Footer";
import Alert from "react-bootstrap/Alert";
import * as P from "../../api/paths";
import {localStorageAuthToken, localStorageRoles} from "../../api/constants";
import {loginView} from "../../api/views";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Col from "react-bootstrap/Col";
import {isStringNullOrEmpty} from "./addProject/FormValidator";
import {useNavigate} from "react-router-dom";

function ProjectView() {
    const navigate = useNavigate();
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
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
    const [projects, setProjects] = useState([]);
    const [list, setList] = useState([]);
    const [projectInfoCard, setProjectInfoCard] = useState(defaultCard);
    const [isAlert, setIsAlert] = useState(false);
    const [projectStructureCard, setProjectStructureCard] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const alert = (
        <Alert variant="danger" onClose={() => {
            setIsAlert(false);
            setAlertMessage('');
        }} dismissible>
            <Alert.Heading>Błąd serwera</Alert.Heading>
            Podczas pobrania danych z serwera wystąpił nieoczekiwany błąd: {alertMessage}
        </Alert>
    );
    const handleSearchOnChange = (event) => {
        const searchValue = event.target.value;
        if (isStringNullOrEmpty(searchValue)) {
            setList(projects);
        } else {
            const newList = projects.slice().filter(value => value.match(searchValue + ".*"));
            setList(newList);
        }
    };
    const handleOnKeyDown = (event) => {
        const searchValue = event.target.value;
        if (event.code === 'Space' && isStringNullOrEmpty(searchValue)) {
            event.preventDefault();
        }
    };
    const handleListOnClick = (item) => {
        if (roles.length === 0) {
            return;
        }
        fetch(P.server + P.projects + '?name=' + item, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
            }
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 200) {
                    return res.json();
                } else {
                    return res.json().then(obj => {
                        throw new Error(obj.message)
                    });
                }
            })
            .then(data => {
                setProjectInfoCard(<ProjectInfoCard project={data[0]}
                                                    handleAlert={setIsAlert}
                                                    deleteElement={() => deleteListElement(data[0])}/>);
                setProjectStructureCard(<ProjectStructureCard project={data[0]}/>);
            })
            .catch(error => {
                setAlertMessage(error.message);
                setIsAlert(true);
            });
    };
    const deleteListElement = (project) => {
        fetch(P.server + P.projects + '/' + project.name, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
            }
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 204) {
                    const newProjects = projects.slice();
                    const index = newProjects.indexOf(project.name);
                    newProjects.splice(index, 1);
                    setProjects(newProjects);
                    setList(newProjects);
                    setProjectInfoCard(defaultCard);
                    setProjectStructureCard(null);
                } else {
                    return res.json().then(obj => {
                        throw new Error(obj.message)
                    });
                }
            })
            .catch(error => {
                setAlertMessage(error.message);
                setIsAlert(true);
            });
    };

    useEffect(() => {
        fetch(P.server + P.projects + '/names', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
            }
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 200) {
                    return res.json();
                } else {
                    return res.json().then(obj => {
                        throw new Error(obj.message)
                    });
                }
            })
            .then(data => {
                setProjects(data);
                setList(data);
                document.getElementById('search').value = '';
            })
            .catch(error => {
                setAlertMessage(error.message);
                setIsAlert(true);
            });
    }, []);

    return (
        <Fragment>
            <Menu/>
            {isAlert ? alert : null}
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <Col className="project-column">
                        <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
                        <Form.Control type="text" id="search" placeholder="Nazwa projektu"
                                      onChange={(e) => handleSearchOnChange(e)}
                                      onKeyDown={(e) => handleOnKeyDown(e)}/>
                        <ListGroup variant="flush" className="projects-list mt-3 mb-3">
                            {list.map(item =>
                                <ListGroupItem key={item}
                                               action
                                               variant="light"
                                               onClick={() => handleListOnClick(item)}>
                                    {item}
                                </ListGroupItem>)}
                        </ListGroup>
                    </Col>
                    <Col xs={8} className="project-column">
                        {projectInfoCard}
                        {projectStructureCard}
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default ProjectView;
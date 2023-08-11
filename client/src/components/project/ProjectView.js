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
import * as C from "../../api/constants";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Col from "react-bootstrap/Col";
import {isStringNullOrEmpty} from "./addProject/FormValidator";
import {useNavigate} from "react-router-dom";

function ProjectView() {
    const navigate = useNavigate();
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
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    const [projects, setProjects] = useState([]);
    const [list, setList] = useState([]);
    const [projectInfoCard, setProjectInfoCard] = useState(defaultCard);
    const [isAlert, setIsAlert] = useState(false);
    const [projectStructureCard, setProjectStructureCard] = useState(null);
    const fetchAlert = (
        <Alert variant="danger" onClose={() => setIsAlert(false)} dismissible>
            <Alert.Heading>Błąd serwera</Alert.Heading>
            Podczas pobrania danych z serwera wystąpił nieoczekiwany błąd.
        </Alert>
    );
    const headers = {
        'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
    };
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
        const name = item.name ? item.name : item;
        fetch(P.base + P.projects + '?name=' + name, {
            method: 'GET',
            headers: headers
        })
            .then(res => {
                if (res.status === 401) {
                    navigate('/');
                }
                return res.json();
            })
            .then(data => {
                setProjectInfoCard(<ProjectInfoCard item={data[0]}
                                                    actions={item.actions ? item.actions : null}
                                                    handleAlert={setIsAlert}
                                                    deleteElement={() => deleteListElement(data[0])}/>);
                setProjectStructureCard(<ProjectStructureCard item={data[0]}/>);
            })
            .catch(error => setIsAlert(true));
    };
    const deleteListElement = (project) => {
        fetch(P.base + P.projects + '/' + project.name, {
            method: 'DELETE',
            headers: headers
        })
            .then(data => {
                const newProjects = projects.slice();
                const index = newProjects.indexOf(project.name);
                newProjects.splice(index, 1);
                setProjects(newProjects);
                setList(newProjects);
                setProjectInfoCard(defaultCard);
                setProjectStructureCard(null);
            })
            .catch(error => setIsAlert(true));
    };

    useEffect(() => {
        if (roles.includes(C.AdminRole)) {
            fetch(P.base + P.projects + '/names', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
                }
            })
                .then(res => {
                    if (res.status === 401) {
                        navigate('/');
                    }
                    return res.json();
                })
                .then(data => {
                    setProjects(data);
                    setList(data);
                    document.getElementById('search').value = '';
                })
                .catch(error => setIsAlert(true));
        } else {
            fetch(P.base + P.users + '/' + window.localStorage.getItem(C.localStorageUser) + P.projects, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
                }
            })
                .then(res => {
                    if (res.status === 401) {
                        navigate('/');
                    }
                    return res.json();
                })
                .then(data => {
                    const projects = data.map(item => ({
                        name: item.name,
                        actions: item.actions
                    }));
                    setProjects(projects);
                    setList(projects);
                    document.getElementById('search').value = '';
                })
                .catch(error => setIsAlert(true));
        }
    }, []);

    return (
        <Fragment>
            <Menu/>
            {isAlert ? fetchAlert : null}
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <Col className="project-column">
                        <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
                        <Form.Control type="text" id="search" placeholder="Nazwa projektu"
                                      onChange={(e) => handleSearchOnChange(e)}
                                      onKeyDown={(e) => handleOnKeyDown(e)}/>
                        <ListGroup variant="flush" className="projects-list mt-3 mb-3">
                            {list.map(item =>
                                <ListGroupItem key={item.name ? item.name : item}
                                               action
                                               variant="light"
                                               onClick={() => handleListOnClick(item)}>
                                    {item.name ? item.name : item}
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
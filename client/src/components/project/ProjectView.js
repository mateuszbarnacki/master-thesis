import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Fragment, useState} from "react";
import Menu from "../Menu";
import ProjectInfoCard from "./ProjectInfoCard";
import ProjectListColumn from "./ProjectListColumn";
import ProjectStructureCard from "./ProjectStructureCard";
import ProjectInfoColumn from "./ProjectInfoColumn";
import Footer from "../Footer";
import Alert from "react-bootstrap/Alert";
import * as P from "../../api/paths";
import * as C from "../../api/constants";

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
    const [isAlert, setIsAlert] = useState(false);
    const [projectStructureCard, setProjectStructureCard] = useState(null);
    const fetchAlert = (
        <Alert variant="danger" onClose={() => setIsAlert(false)} dismissible>
            <Alert.Heading>Błąd serwera</Alert.Heading>
            Podczas pobrania danych z serwera wystąpił nieoczekiwany błąd.
        </Alert>
    );
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
        }
    };
    const handleListOnClick = (item) => {
        fetch(P.base + P.projects + '?name=' + item, requestOptions)
            .then(res => res.json())
            .then(data => {
                setProjectInfoCard(<ProjectInfoCard item={data[0]}/>);
                setProjectStructureCard(<ProjectStructureCard item={data[0]}/>);
            })
            .catch(error => setIsAlert(true));
    };

    return (
        <Fragment>
            <Menu/>
            {isAlert ? fetchAlert : null}
            <Container style={{marginTop: "2vh"}}>
                <Row>
                    <ProjectListColumn handleListOnClick={handleListOnClick}
                                       handleAlert={setIsAlert}/>
                    <ProjectInfoColumn projectInfoCard={projectInfoCard}
                                       projectStructureCard={projectStructureCard}/>
                </Row>
            </Container>
            <Footer/>
        </Fragment>
    );
}

export default ProjectView;
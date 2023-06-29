import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {Fragment} from "react";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const mock = [
    'proj1',
    'pomiar powietrza',
    'proj352',
    'Test',
    'pomiar zanieczyszczenia powietrza',
    'pomiar',
    'pomiar testowy',
    'pomiar2',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
    'poject',
];

function ProjectList() {
    const displayCard = (item) => {
        return (
            <Card>
                <CardHeader>item</CardHeader>
                <Card.Body>
                    <Card.Title>Informacje o projekcie</Card.Title>
                    <Card.Text>Opis projektu</Card.Text>
                    <ButtonGroup>
                        <Button variant="light">Edytuj</Button>
                        <Button variant="light">Wyczyść</Button>
                        <Button variant="light">Archiwizuj</Button>
                        <Button variant="light">Usuń</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Fragment>
            <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
            <Form.Control
                type="text"
                id="search"
                placeholder="Nazwa projektu"
            />
            <ListGroup variant="flush"
                       style={{
                           border: "1px solid black",
                           height: "60vh",
                           overflowY: "auto",
                           marginTop: "2vh"
                       }}>
                {mock.map(item =>
                    <ListGroupItem key={item}
                                   action
                                   onClick={displayCard}>
                        {item}
                    </ListGroupItem>)}
            </ListGroup>
        </Fragment>
    );
}

export default ProjectList;
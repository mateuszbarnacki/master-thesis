import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {Fragment, useState} from "react";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {isStringNullOrEmpty} from "./addProject/FormValidator";

const mock = [
    'proj1',
    'pomiar powietrza',
    'proj352',
    'Test',
    'pomiar zanieczyszczenia powietrza',
    'pomiar',
    'pomiar testowy',
    'pomiar2',
    'project'
];

function ProjectList() {
    const [list, setList] = useState(mock);
    const handleOnChange = (event) => {
        const searchValue = event.target.value;
        console.log(searchValue);
        if (isStringNullOrEmpty(searchValue)) {
            setList(mock);
        } else {
            const newList = mock.slice().filter(value => value.match(searchValue + ".*"));
            setList(newList);
        }
    };
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
    };

    return (
        <Fragment>
            <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu" onChange={(e) => handleOnChange(e)}/>
            <ListGroup variant="flush"
                       style={{
                           border: "1px solid black",
                           height: "60vh",
                           overflowY: "auto",
                           marginTop: "2vh"}}>
                {list.map(item =>
                    <ListGroupItem key={item}
                                   action
                                   onClick={() => displayCard(item)}>
                        {item}
                    </ListGroupItem>)}
            </ListGroup>
        </Fragment>
    );
}

export default ProjectList;
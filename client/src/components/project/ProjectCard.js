import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

function ProjectCard() {
    return (
        <Card className="border-black m-3">
            <CardHeader as="h5">Test</CardHeader>
            <Card.Body>
                <Card.Title>Informacje o projekcie</Card.Title>
                <Card.Text>Opis projektu</Card.Text>
                <ButtonGroup className="mb-2">
                    <Button variant="outline-dark"
                            style={{border: "1px solid black"}}>Dodaj pomiary</Button>
                    <Button variant="outline-dark"
                            style={{border: "1px solid black"}}>Edytuj projekt</Button>
                    <Button variant="outline-dark"
                            style={{border: "1px solid black"}}>Sklonuj</Button>
                    <Button variant="outline-dark"
                            style={{border: "1px solid black"}}>Usuń</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;
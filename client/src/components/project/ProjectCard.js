import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import DeleteProjectModal from "./modals/DeleteProjectModal";

function ProjectCard({item}) {
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const handleDeleteProjectModalClose = () => {
        setShowDeleteProjectModal(false);
    };

    return (
        <Fragment>
            <Card className="border-black m-3">
                <CardHeader as="h5">{item.name}</CardHeader>
                <Card.Body className="text-center">
                    <Card.Title>Informacje o projekcie</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <ButtonGroup className="mb-2">
                        <Button variant="outline-dark" style={{border: "1px solid black"}}>Dodaj pomiar</Button>
                        <Button variant="outline-dark" style={{border: "1px solid black"}}>Sklonuj</Button>
                        <Button variant="outline-dark" style={{border: "1px solid black"}}
                                onClick={() => setShowDeleteProjectModal(true)}>Usuń</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <DeleteProjectModal show={showDeleteProjectModal}
                                closeModal={handleDeleteProjectModalClose}/>
        </Fragment>
    );
}

export default ProjectCard;
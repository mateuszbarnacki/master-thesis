import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import UploadMeasurementsModal from "./modals/UploadMeasurementsModal";
import CloneProjectModal from "./modals/CloneProjectModal";

function ProjectCard({item}) {
    const [showUploadMeasurementsModal, setShowUploadMeasurementsModal] = useState(false);
    const [showCloneProjectModal, setShowCloneProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const handleUploadMeasurementsModalClose = () => {
        setShowUploadMeasurementsModal(false);
    };
    const handleCloneProjectModalClose = () => {
        setShowCloneProjectModal(false);
    };
    const handleDeleteProjectModalClose = () => {
        setShowDeleteProjectModal(false);
    };

    return (
        <Fragment>
            <Card className="border-black m-3">
                <CardHeader as="h5">{item.name}</CardHeader>
                <Card.Body className="text-center">
                    {item.description ?
                        (<>
                            <Card.Title>Informacje o projekcie</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                        </>) : null}
                    <ButtonGroup className="mb-2">
                        <Button variant="outline-dark" style={{border: "1px solid black"}}
                                onClick={() => setShowUploadMeasurementsModal(true)}>
                            Dodaj pomiar
                        </Button>
                        <Button variant="outline-dark" style={{border: "1px solid black"}}
                                onClick={() => setShowCloneProjectModal(true)}>
                            Sklonuj
                        </Button>
                        <Button variant="outline-dark" style={{border: "1px solid black"}}
                                onClick={() => setShowDeleteProjectModal(true)}>
                            Usuń
                        </Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <UploadMeasurementsModal sensors={item.sensors} show={showUploadMeasurementsModal}
                                     closeModal={handleUploadMeasurementsModalClose}/>
            <CloneProjectModal project={item} show={showCloneProjectModal}
                               closeModal={handleCloneProjectModalClose}/>
            <DeleteProjectModal show={showDeleteProjectModal}
                                closeModal={handleDeleteProjectModalClose}/>
        </Fragment>
    );
}

export default ProjectCard;
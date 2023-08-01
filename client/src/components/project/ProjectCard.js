import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import UploadMeasurementsModal from "./modals/UploadMeasurementsModal";
import CloneProjectModal from "./modals/CloneProjectModal";
import * as C from '../../api/constants';
import ReadMeasurementsModal from "./modals/ReadMeasurementsModal";

function ProjectCard({item}) {
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    const [showUploadMeasurementsModal, setShowUploadMeasurementsModal] = useState(false);
    const [showReadMeasurementsModal, setShowReadMeasurementsModal] = useState(false);
    const [showCloneProjectModal, setShowCloneProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const handleUploadMeasurementsModalClose = () => {
        setShowUploadMeasurementsModal(false);
    };
    const handleReadMeasurementsModalClose = () => {
        setShowReadMeasurementsModal(false);
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
                        {roles.includes(C.ResearcherRole) || roles.includes(C.AdminRole) ?
                            <Button variant="outline-dark" style={{border: "1px solid black"}}
                                    onClick={() => setShowUploadMeasurementsModal(true)}>
                                Dodaj pomiar
                            </Button>
                            : null
                        }
                        {roles.includes(C.ResearcherRole) || roles.includes(C.AdminRole) ?
                            <Button variant="outline-dark" style={{border: "1px solid black"}}
                                    onClick={() => setShowReadMeasurementsModal(true)}>
                                Czytaj pomiary
                            </Button>
                            : null
                        }
                        {roles.includes(C.ProjectCreatorRole) || roles.includes(C.AdminRole) ?
                            <Button variant="outline-dark" style={{border: "1px solid black"}}
                                    onClick={() => setShowCloneProjectModal(true)}>
                                Sklonuj
                            </Button>
                            : null
                        }
                        {roles.includes(C.AdminRole) ?
                            <Button variant="outline-dark" style={{border: "1px solid black"}}
                                    onClick={() => setShowDeleteProjectModal(true)}>
                                Usuń
                            </Button>
                            : null
                        }
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <UploadMeasurementsModal sensors={item.sensors} show={showUploadMeasurementsModal}
                                     closeModal={handleUploadMeasurementsModalClose}/>
            <ReadMeasurementsModal show={showReadMeasurementsModal}
                                   closeModal={handleReadMeasurementsModalClose}/>
            <CloneProjectModal project={item} show={showCloneProjectModal}
                               closeModal={handleCloneProjectModalClose}/>
            <DeleteProjectModal show={showDeleteProjectModal}
                                closeModal={handleDeleteProjectModalClose}/>
        </Fragment>
    );
}

export default ProjectCard;
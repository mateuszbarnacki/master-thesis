import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import CloneProjectModal from "./modals/CloneProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import ReadMeasurementsModal from "./modals/ReadMeasurementsModal";
import UploadMeasurementsModal from "./modals/UploadMeasurementsModal";
import * as C from '../../api/constants';

function ProjectInfoCard({item, handleAlert, deleteElement}) {
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
            <Card className="border-black m-3 project-card">
                <CardHeader as="h5">{item.name}</CardHeader>
                <Card.Body className="text-center">
                    {item.description ?
                        (<>
                            <Card.Title>Informacje o projekcie</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                        </>) : <Card.Title>Akcje</Card.Title>}
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
                                     closeModal={handleUploadMeasurementsModalClose}
                                     acronym={item.acronym}
                                     handleAlert={(value) => handleAlert(value)}/>
            <ReadMeasurementsModal acronym={item.acronym}
                                   show={showReadMeasurementsModal}
                                   closeModal={handleReadMeasurementsModalClose}
                                   handleAlert={(value) => handleAlert(value)}/>
            <CloneProjectModal project={item} show={showCloneProjectModal}
                               closeModal={handleCloneProjectModalClose}/>
            <DeleteProjectModal show={showDeleteProjectModal}
                                closeModal={handleDeleteProjectModalClose}
                                deleteElement={() => deleteElement(item)}/>
        </Fragment>
    );
}

export default ProjectInfoCard;
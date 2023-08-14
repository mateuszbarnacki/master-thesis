import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import CloneProjectModal from "./modals/CloneProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import ReadMeasurementsModal from "./modals/ReadMeasurementsModal";
import UploadMeasurementsModal from "./modals/UploadMeasurementsModal";
import {localStorageAuthToken, localStorageRoles, localStorageUser} from '../../api/constants';
import {AddMeasurementAction, ReadMeasurementsAction} from "../../api/actions";
import {AdminRole, ResearcherRole, ProjectCreatorRole} from "../../api/roles";
import * as P from "../../api/paths";
import {loginView} from "../../api/views";

function ProjectInfoCard({project, handleAlert, deleteElement}) {
    const navigate = useNavigate();
    const roles = !!window.localStorage.getItem(localStorageRoles) ?
        window.localStorage.getItem(localStorageRoles) : [];
    const [showUploadMeasurementsModal, setShowUploadMeasurementsModal] = useState(false);
    const [showReadMeasurementsModal, setShowReadMeasurementsModal] = useState(false);
    const [showCloneProjectModal, setShowCloneProjectModal] = useState(false);
    const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
    const addMeasurementButton = (
        <Button variant="outline-dark"
                style={{border: "1px solid black"}}
                onClick={() => setShowUploadMeasurementsModal(true)}>
            Dodaj pomiar
        </Button>);
    const readMeasurementButton = (
        <Button variant="outline-dark"
                style={{border: "1px solid black"}}
                onClick={() => setShowReadMeasurementsModal(true)}>
            Czytaj pomiary
        </Button>
    );
    const cloneButton = (
        <Button variant="outline-dark"
                style={{border: "1px solid black"}}
                onClick={() => setShowCloneProjectModal(true)}>
            Sklonuj
        </Button>
    );
    const deleteButton = (
        <Button variant="outline-dark"
                style={{border: "1px solid black"}}
                onClick={() => setShowDeleteProjectModal(true)}>
            Usuń
        </Button>
    );
    const [addMeasurement, setAddMeasurement] = useState(addMeasurementButton);
    const [readMeasurement, setReadMeasurement] = useState(readMeasurementButton);
    const [clone, setClone] = useState(cloneButton);
    const [deleteProject, setDeleteProject] = useState(deleteButton);
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

    useEffect(() => {
        fetch(P.server + P.users + '/' + window.localStorage.getItem(localStorageUser) + '/' + project.name, {
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
                const project = data[0];
                setAddMeasurement(
                    (roles.includes(ResearcherRole) && project?.actions.includes(AddMeasurementAction)) ||
                    roles.includes(AdminRole) ? addMeasurementButton : null);
                setReadMeasurement(
                    (roles.includes(ResearcherRole) && project?.actions.includes(ReadMeasurementsAction)) ||
                    roles.includes(AdminRole) ? readMeasurementButton : null);
                setClone(roles.includes(ProjectCreatorRole) || roles.includes(AdminRole) ? cloneButton : null);
                setDeleteProject(roles.includes(AdminRole) ? deleteButton : null);
            })
            .catch(() => handleAlert(true));
    }, [project]);

    return (
        <Fragment>
            <Card className="border-black m-3 project-card">
                <CardHeader as="h5">{project.name}</CardHeader>
                <Card.Body className="text-center">
                    {project.description ?
                        (<>
                            <Card.Title>Informacje o projekcie</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                        </>) : <Card.Title>Akcje</Card.Title>}
                    <ButtonGroup className="mb-2">
                        {addMeasurement}
                        {readMeasurement}
                        {clone}
                        {deleteProject}
                    </ButtonGroup>
                </Card.Body>
            </Card>
            <UploadMeasurementsModal sensors={project.sensors} show={showUploadMeasurementsModal}
                                     closeModal={handleUploadMeasurementsModalClose}
                                     acronym={project.acronym}
                                     handleAlert={(value) => handleAlert(value)}/>
            <ReadMeasurementsModal acronym={project.acronym}
                                   show={showReadMeasurementsModal}
                                   closeModal={handleReadMeasurementsModalClose}
                                   handleAlert={(value) => handleAlert(value)}/>
            <CloneProjectModal project={project} show={showCloneProjectModal}
                               closeModal={handleCloneProjectModalClose}/>
            <DeleteProjectModal show={showDeleteProjectModal}
                                closeModal={handleDeleteProjectModalClose}
                                deleteElement={() => deleteElement(project)}/>
        </Fragment>
    );
}

export default ProjectInfoCard;
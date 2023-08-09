import ModalHeader from "react-bootstrap/ModalHeader";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import CloneProjectForm from "./CloneProjectForm";
import {validateProject} from "../addProject/FormValidator";
import * as P from "../../../api/paths";
import * as C from "../../../api/constants";
import * as ProjectBuilder from "../addProject/ProjectBuilder";
import Alert from "react-bootstrap/Alert";
import {useState} from "react";

function CloneProjectModal({project, show, closeModal}) {
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const alert = (
        <Alert variant="danger" dismissible
               onClose={() => {
                   setIsAlert(false);
                   setAlertMessage('');
               }}>
            <Alert.Heading>Błąd tworzenia projektu</Alert.Heading>
            Podczas tworzenia projektu wykryto następujące błędy: {alertMessage}
        </Alert>
    );
    const handleSaveClick = () => {
        const projectDto = ProjectBuilder.buildProject(project ? project.sensors.length : 1);
        const validationResult = validateProject(projectDto);
        if (validationResult.length > 0) {
            const errorMessage = validationResult.join('\n');
            setAlertMessage(errorMessage);
            setIsAlert(true);
            return;
        }
        fetch(P.base + P.projects, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem(C.localStorageAuthToken),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectDto)
        })
            .then(res => {
                if (res.status !== 201) {
                    return res.json().then(obj => {throw new Error(obj.message)});
                }
                closeModal();
                window.location.reload();
                return res.json();
            })
            .catch(error => {
                setAlertMessage(error.message);
                setIsAlert(true);
            });
    };

    return (
        <Modal size="xl" show={show} centered>
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Klonuj projekt
                </ModalTitle>
            </ModalHeader>
            {isAlert ? alert : null}
            <CloneProjectForm project={project}/>
            <ModalFooter className="modal-center">
                <Button variant="danger" onClick={closeModal} size="lg">Anuluj</Button>
                <Button variant="success" onClick={handleSaveClick} size="lg">Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default CloneProjectModal;
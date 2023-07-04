import ModalHeader from "react-bootstrap/ModalHeader";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import CloneProjectForm from "../CloneProjectForm";

function CloneProjectModal({project, show, closeModal}) {
    return (
        <Modal size="xl" show={show} centered>
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Klonuj projekt
                </ModalTitle>
            </ModalHeader>
            <CloneProjectForm project={project}/>
            <ModalFooter className="modal-center">
                <Button variant="danger" onClick={closeModal} size="lg">Anuluj</Button>
                <Button variant="success" onClick={closeModal} size="lg">Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default CloneProjectModal;
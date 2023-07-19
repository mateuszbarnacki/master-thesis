import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import RolesAndActionsForm from "./RolesAndActionsForm";

function ManageRolesModal({projects, roles, show, closeModal}) {
    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">Zmień uprawnienia</ModalTitle>
            </ModalHeader>
            <ModalBody className="text-center">
                <RolesAndActionsForm projects={projects} roles={roles} update={true}/>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" size="lg" onClick={closeModal}>Anuluj</Button>
                <Button variant="success" size="lg" onClick={closeModal}>Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ManageRolesModal;
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";

function DeleteProjectModal({show, closeModal}) {
    return (
        <Modal show={show} centered dialogClassName="delete-modal-size">
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Usuń projekt
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="text-center" as="h5">
                Czy na pewno chcesz usunąć projekt?
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" onClick={closeModal} size="lg">
                    Nie
                </Button>
                <Button variant="success" onClick={closeModal} size="lg">
                    Tak
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteProjectModal;
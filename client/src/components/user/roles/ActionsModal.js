import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ActionsTable from "./ActionsTable";
import * as C from "../../../api/constants";

function ActionsModal({userProjects, show, closeModal}) {
    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle>Zmień widoczność akcji</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form className="text-center">
                    <ActionsTable userProjects={userProjects} update={true}/>
                </Form>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" size="lg" onClick={closeModal}>Anuluj</Button>
                <Button variant="success" size="lg" onClick={closeModal}>Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ActionsModal;
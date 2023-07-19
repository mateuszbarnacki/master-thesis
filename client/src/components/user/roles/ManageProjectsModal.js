import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import UserProjectsList from "../UserProjectsList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";

const mock = [
    {
        name: "Zanieczyszczenia Kraków",
        actions: [true, false]
    },
    {
        name: "Projekt terenowy",
        actions: [false, true]
    },
    {
        name: "Zanieczyszczenia Radom",
        actions: [true, false]
    },
    {
        name: "Zanieczyszczenia Police",
        actions: [true, true]
    },
    {
        name: "Klimat Szczecina",
        actions: [false, false]
    },
    {
        name: "Test",
        actions: [true, false]
    }
];


function ManageProjectsModal({userProjects, show, closeModal}) {
    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle>Zmień dostęp do projektów</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormLabel as="h5">Projekty:</FormLabel>
                    <UserProjectsList projects={mock.map(item => item.name)}
                                      userProjects={userProjects.map(item => item.name)}
                                      update={true}/>
                </Form>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" size="lg" onClick={closeModal}>Anuluj</Button>
                <Button variant="success" size="lg" onClick={closeModal}>Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ManageProjectsModal;
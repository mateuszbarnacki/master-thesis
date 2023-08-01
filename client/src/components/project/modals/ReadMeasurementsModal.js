import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import ModalFooter from "react-bootstrap/ModalFooter";

const mock = [
    {
        date: '2023-07-30',
        temperature: 13
    },
    {
        date: '2023-07-31',
        temperature: 32
    },
    {
        date: '2023-08-01',
        temperature: -7
    }
];

function ReadMeasurementsModal({show, closeModal}) {
    return (
        <Modal size="lg" show={show} centered>
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Czytaj ostatnie pomiary
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="modal-center">
                <Card body>
                    {mock.map(item =>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    )}
                </Card>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" onClick={closeModal} size="lg">
                    Zamknij
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ReadMeasurementsModal;
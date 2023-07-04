import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormSelect from "react-bootstrap/FormSelect";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import DragAndDropFile from "../../DragAndDropFile";
import {useState} from "react";
import FileInfo from "../../FileInfo";
import FormLabel from "react-bootstrap/FormLabel";

function UploadMeasurementsModal({sensors, show, closeModal}) {
    const [file, setFile] = useState(null);

    const handleCancelAction = () => {
        setFile(null);
        closeModal();
    };

    return (
        <Modal size="lg" show={show} centered>
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Dodaj pomiar
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormLabel htmlFor="sensorId" as="h6">Identyfikator czujnika:</FormLabel>
                    <FormSelect id="sensorId">
                        {sensors.map(item => <option key={item.deviceId}>{item.deviceId}</option>)}
                    </FormSelect>
                </Form>
                <DragAndDropFile changeFile={(file) => setFile(file)}/>
                {file ? <FileInfo file={file} changeFile={(file) => setFile(file)}/> : null}
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" onClick={handleCancelAction} size="lg">
                    Anuluj
                </Button>
                <Button variant="success" onClick={closeModal} size="lg">
                    Zapisz pomiar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UploadMeasurementsModal;
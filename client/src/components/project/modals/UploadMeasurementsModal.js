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
import * as P from "../../../api/paths";
import * as C from "../../../api/constants";

function UploadMeasurementsModal({sensors, acronym, show, closeModal, handleAlert}) {
    const [file, setFile] = useState(null);
    const handleCancelAction = () => {
        setFile(null);
        closeModal();
    };
    const handleSaveAction = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const deviceId = document.getElementById('sensorId').value;
            fetch(P.base + P.measurements + '/upload/' + acronym + '/' + deviceId, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
                },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    closeModal();
                    setFile(null);
                })
                .catch(error => handleAlert(true))
        }
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
                <Button variant="success" onClick={handleSaveAction} size="lg">
                    Zapisz pomiar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UploadMeasurementsModal;
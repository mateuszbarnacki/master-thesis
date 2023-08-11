import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormSelect from "react-bootstrap/FormSelect";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import DragAndDropFile from "../../DragAndDropFile";
import FileInfo from "../../FileInfo";
import FormLabel from "react-bootstrap/FormLabel";
import * as P from "../../../api/paths";
import {localStorageAuthToken} from "../../../api/constants";
import {loginView} from "../../../api/views";

function UploadMeasurementsModal({sensors, acronym, show, closeModal, handleAlert}) {
    const navigate = useNavigate();
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
            fetch(P.server + P.measurements + '/upload/' + acronym + '/' + deviceId, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem(localStorageAuthToken)
                },
                body: formData
            })
                .then(res => {
                    if (res.status === 401) {
                        navigate(loginView);
                    }
                    if (res.status !== 201) {
                        return res.json().then(obj => {
                            throw new Error(obj.message)
                        });
                    }
                    closeModal();
                    setFile(null);
                    return res.json();
                })
                .catch(() => handleAlert(true))
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
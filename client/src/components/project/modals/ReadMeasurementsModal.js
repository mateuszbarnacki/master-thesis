import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import ModalFooter from "react-bootstrap/ModalFooter";
import SyntaxHighlighter from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/src/styles/hljs/vs";
import {useEffect, useState} from "react";
import * as P from "../../../api/paths";
import * as C from "../../../api/constants";

function ReadMeasurementsModal({acronym, show, closeModal, handleAlert}) {
    const [measurements, setMeasurements] = useState([]);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
        }
    };
    useEffect(() => {
        fetch(P.base + P.measurements + '/' + acronym + '/latest', requestOptions)
            .then(res => res.json())
            .then(data => setMeasurements(data))
            .catch(error => handleAlert(true));
    }, [acronym]);

    return (
        <Modal size="lg" show={show} centered>
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">
                    Czytaj ostatnie pomiary
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="modal-center">
                <Card body className="modal-json">
                    {measurements.map(item =>
                        <SyntaxHighlighter
                            language="json"
                            style={vs}
                            wrapLines={true}>
                            {JSON.stringify(item, null, 2)}
                        </SyntaxHighlighter>
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
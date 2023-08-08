import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ActionsTable from "./ActionsTable";
import * as C from "../../../api/constants";
import * as P from "../../../api/paths";

function ActionsModal({userProjects, show, closeModal, handleAlert}) {
    const handleSuccessClick = () => {
        const projects = [];
        const table = document.getElementById('modal-table');
        const tableBody = table.children[1];
        const tableRows = tableBody.children;
        for (const element of tableRows) {
            const columns = element.children;
            let id = columns[1].innerHTML;
            let name = columns[2].innerHTML;
            let actions = [];
            if (columns[3].children[0].checked) actions.push(C.AddMeasurementAction);
            if (columns[4].children[0].checked) actions.push(C.ReadMeasurementsAction);
            projects.push({
                id: id,
                name: name,
                actions: actions
            });
        }
        const projectActionsDto = {
            projects: projects
        };
        fetch(P.base + P.userProjects, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectActionsDto)
        })
            .then(res => res.json())
            .then(data => closeModal())
            .catch(error => handleAlert(true));
    };

    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle>Zmień widoczność akcji</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form className="text-center">
                    <ActionsTable id="modal-table" userProjects={userProjects} update={true}/>
                </Form>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" size="lg" onClick={closeModal}>Anuluj</Button>
                <Button variant="success" size="lg" onClick={handleSuccessClick}>Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ActionsModal;
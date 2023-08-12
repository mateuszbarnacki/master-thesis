import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ActionsTable from "./ActionsTable";
import * as P from "../../../api/paths";
import {AddMeasurementAction, ReadMeasurementsAction} from "../../../api/actions";
import {loginView} from "../../../api/views";
import {localStorageAuthToken} from "../../../api/constants";

function ActionsModal({userProjects, show, closeModal, showAlert}) {
    const navigate = useNavigate();
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
            if (columns[3].children[0].checked) actions.push(AddMeasurementAction);
            if (columns[4].children[0].checked) actions.push(ReadMeasurementsAction);
            projects.push({
                id: id,
                name: name,
                actions: actions
            });
        }
        const projectActionsDto = {
            projects: projects
        };
        fetch(P.server + P.userProjects, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectActionsDto)
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status !== 200) {
                    return res.json().then(obj => {throw new Error(obj.message)});
                }
                closeModal();
                window.location.reload();
                return res.json();
            })
            .catch(() => showAlert(true));
    };

    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle>Zmień widoczność akcji</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form className="text-center">
                    <ActionsTable userProjects={userProjects}/>
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
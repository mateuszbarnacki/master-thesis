import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import AccessForm from "./AccessForm";
import * as P from "../../../api/paths";
import {useNavigate} from "react-router-dom";
import {ResearcherRole, ProjectCreatorRole} from "../../../api/roles";
import {localStorageAuthToken} from "../../../api/constants";
import {loginView} from "../../../api/views";

function AccessModal({
                         user,
                         show,
                         closeModal,
                         checkedProjects,
                         updateCheckedProjects,
                         handleAlert
                     }) {
    const navigate = useNavigate();
    const handleSuccessClick = () => {
        const roles = [];
        if (document.getElementById(user.username + '-researcher-modal-checkbox').checked) roles.push(ResearcherRole);
        if (document.getElementById(user.username + '-project-creator-modal-checkbox').checked) roles.push(ProjectCreatorRole);
        const projects = checkedProjects.map(item => ({
            name: item,
            actions: []
        }));
        const projectDto = {
            username: user.username,
            roles: roles,
            projects: projects
        };
        fetch(P.server + P.users, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectDto)
        })
            .then(res => {
                if (res.status === 401) {
                  navigate(loginView);
                } else if (res.status !== 200) {
                    return res.json().then(obj => {throw new Error(obj.message)});
                }
                updateCheckedProjects([]);
                closeModal();
                window.location.reload();
                return res.json();
            })
            .catch(() => handleAlert(true));
    };

    return (
        <Modal centered show={show} size="xl">
            <ModalHeader className="modal-center">
                <ModalTitle as="h3">Zmień uprawnienia</ModalTitle>
            </ModalHeader>
            <ModalBody className="text-center">
                <AccessForm user={user}
                            handleAlert={(value) => handleAlert(value)}
                            updateCheckedProjects={(values) => updateCheckedProjects(values)}/>
            </ModalBody>
            <ModalFooter className="modal-center">
                <Button variant="danger" size="lg" onClick={closeModal}>Anuluj</Button>
                <Button variant="success" size="lg" onClick={handleSuccessClick}>Zapisz</Button>
            </ModalFooter>
        </Modal>
    );
}

export default AccessModal;
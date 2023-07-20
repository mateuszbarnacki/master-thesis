import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import ActionsModal from "./roles/ActionsModal";
import {Fragment, useState} from "react";
import AccessForm from "./roles/AccessForm";
import AccessModal from "./roles/AccessModal";

function UserTab({user, index}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);
    const [showManageProjectsModal, setShowManageProjectsModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <AccessForm projects={user.projects} roles={user.roles} update={false}/>
                    <Button variant="dark" className="mt-3 me-3"
                            onClick={() => setShowManageRolesModal(true)}>
                        Edytuj uprawnienia
                    </Button>
                    <Button variant="dark" className="mt-3 ms-3"
                            onClick={() => setShowManageProjectsModal(true)}>
                        Edytuj akcje
                    </Button>
                </AccordionBody>
            </AccordionItem>
            <ActionsModal projects={user.projects} roles={user.roles}
                          show={showManageRolesModal}
                          closeModal={() => setShowManageRolesModal(false)}/>
            <AccessModal userProjects={user.projects} show={showManageProjectsModal}
                         closeModal={() => setShowManageProjectsModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
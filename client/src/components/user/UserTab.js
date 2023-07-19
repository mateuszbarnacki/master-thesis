import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import ManageRolesModal from "./roles/ManageRolesModal";
import {Fragment, useState} from "react";
import RolesAndActionsForm from "./roles/RolesAndActionsForm";
import ManageProjectsModal from "./roles/ManageProjectsModal";

function UserTab({user, index}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);
    const [showManageProjectsModal, setShowManageProjectsModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <RolesAndActionsForm projects={user.projects} roles={user.roles} update={false}/>
                    <Button variant="dark" className="mt-3 me-3"
                            onClick={() => setShowManageProjectsModal(true)}>
                        Zarządzaj projektami
                    </Button>
                    <Button variant="dark" className="mt-3 ms-3"
                            onClick={() => setShowManageRolesModal(true)}>
                        Edytuj uprawnienia
                    </Button>
                </AccordionBody>
            </AccordionItem>
            <ManageRolesModal projects={user.projects} roles={user.roles}
                              show={showManageRolesModal}
                              closeModal={() => setShowManageRolesModal(false)}/>
            <ManageProjectsModal userProjects={user.projects} show={showManageProjectsModal}
                                 closeModal={() => setShowManageProjectsModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
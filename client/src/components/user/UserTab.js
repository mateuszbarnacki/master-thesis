import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import AccessModal from "./roles/AccessModal";
import {Fragment, useState} from "react";
import AccessForm from "./roles/AccessForm";
import ActionsModal from "./roles/ActionsModal";
import * as C from "../../api/constants";

function UserTab({user, index, handleAlert}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);
    const [showManageProjectsModal, setShowManageProjectsModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <AccessForm user={user}
                                update={false}
                                handleAlert={(value) => handleAlert(value)}/>
                    <Button variant="dark" className="mt-3 me-3"
                            onClick={() => setShowManageRolesModal(true)}>
                        Edytuj uprawnienia
                    </Button>
                    {user.roles.includes(C.ResearcherRole) ?
                        <Button variant="dark" className="mt-3 ms-3"
                                onClick={() => setShowManageProjectsModal(true)}>
                            Edytuj akcje
                        </Button> : null}
                </AccordionBody>
            </AccordionItem>
            <AccessModal user={user}
                         show={showManageRolesModal}
                         closeModal={() => setShowManageRolesModal(false)}
                         handleAlert={(value) => handleAlert(value)}/>
            <ActionsModal userProjects={user.projects} show={showManageProjectsModal}
                          closeModal={() => setShowManageProjectsModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
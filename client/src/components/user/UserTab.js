import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import AccessModal from "./roles/AccessModal";
import {Fragment, useState} from "react";
import ActionsModal from "./roles/ActionsModal";
import UnmodifiableAccessForm from "./roles/UnmodifiableAccessForm";
import * as C from "../../api/constants";

function UserTab({user, index, handleAlert}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);
    const [showManageProjectsModal, setShowManageProjectsModal] = useState(false);
    const [checkedProjects, setCheckedProjects] = useState([]);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <UnmodifiableAccessForm user={user}/>
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
                         checkedProjects={checkedProjects}
                         updateCheckedProjects={(values) => setCheckedProjects(values)}
                         handleAlert={(value) => handleAlert(value)}/>
            <ActionsModal userProjects={user.projects} show={showManageProjectsModal}
                          closeModal={() => setShowManageProjectsModal(false)}
                          handleAlert={(value) => handleAlert(value)}/>
        </Fragment>
    );
}

export default UserTab;
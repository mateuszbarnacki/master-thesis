import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import AccessModal from "./roles/AccessModal";
import {Fragment, useState} from "react";
import ActionsModal from "./roles/ActionsModal";
import UnmodifiableAccessForm from "./roles/UnmodifiableAccessForm";
import {AdminRole, ResearcherRole} from "../../api/roles";

function UserTab({user, index, showAlert}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);
    const [showManageProjectsModal, setShowManageProjectsModal] = useState(false);
    const [checkedProjects, setCheckedProjects] = useState([]);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>
                    {user.username} {user.roles.includes(AdminRole) ? '[Administrator]' : null}
                </AccordionHeader>
                <AccordionBody className="text-center">
                    {user.roles.includes(AdminRole) ? null :
                        <Fragment>
                            <UnmodifiableAccessForm user={user}/>
                            <Button variant="dark" className="mt-3 me-3"
                                    onClick={() => setShowManageRolesModal(true)}>
                                Edytuj uprawnienia
                            </Button>
                            {user.roles.includes(ResearcherRole) ?
                                <Button variant="dark" className="mt-3 ms-3"
                                        onClick={() => setShowManageProjectsModal(true)}>
                                    Edytuj akcje
                                </Button> : null}
                        </Fragment>
                    }
                </AccordionBody>
            </AccordionItem>
            <AccessModal user={user}
                         show={showManageRolesModal}
                         closeModal={() => setShowManageRolesModal(false)}
                         checkedProjects={checkedProjects}
                         updateCheckedProjects={(values) => setCheckedProjects(values)}
                         showAlert={(value) => showAlert(value)}/>
            <ActionsModal userProjects={user.projects} show={showManageProjectsModal}
                          closeModal={() => setShowManageProjectsModal(false)}
                          showAlert={(value) => showAlert(value)}/>
        </Fragment>
    )
        ;
}

export default UserTab;
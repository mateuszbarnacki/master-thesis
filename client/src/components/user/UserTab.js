import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionItem from "react-bootstrap/AccordionItem";
import Button from "react-bootstrap/Button";
import ManageRolesModal from "./roles/ManageRolesModal";
import {Fragment, useState} from "react";
import RolesForm from "./roles/RolesForm";

function UserTab({user, index}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <RolesForm projects={user.projects} roles={user.roles}/>
                    <Button variant="dark" className="mt-3"
                            onClick={() => setShowManageRolesModal(true)}>
                        Edytuj uprawnienia
                    </Button>
                </AccordionBody>
            </AccordionItem>
            <ManageRolesModal projects={user.projects} roles={user.roles} show={showManageRolesModal}
                              closeModal={() => setShowManageRolesModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
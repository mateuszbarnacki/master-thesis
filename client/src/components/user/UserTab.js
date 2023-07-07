import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import Button from "react-bootstrap/Button";
import AccordionItem from "react-bootstrap/AccordionItem";
import RolesTable from "./privileges/RolesTable";
import ManageRolesModal from "./privileges/ManageRolesModal";
import {Fragment, useState} from "react";

function UserTab({user, index}) {
    const [showManageRolesModal, setShowManageRolesModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <RolesTable projects={user.projects} update={false}/>
                    <Button variant="dark" className="mt-3" onClick={() => setShowManageRolesModal(true)}>Edytuj uprawnienia</Button>
                </AccordionBody>
            </AccordionItem>
            <ManageRolesModal projects={user.projects} show={showManageRolesModal}
                              closeModal={() => setShowManageRolesModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
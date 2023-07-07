import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import Button from "react-bootstrap/Button";
import AccordionItem from "react-bootstrap/AccordionItem";
import PrivilegesTable from "./privileges/PrivilegesTable";
import PrivilegesModal from "./privileges/PrivilegesModal";
import {Fragment, useState} from "react";

function UserTab({user, index}) {
    const [showPrivilegesModal, setShowPrivilegesModal] = useState(false);

    return (
        <Fragment>
            <AccordionItem eventKey={index}>
                <AccordionHeader>{user.username}</AccordionHeader>
                <AccordionBody className="text-center">
                    <PrivilegesTable projects={user.projects} update={false}/>
                    <Button variant="dark" className="mt-3" onClick={() => setShowPrivilegesModal(true)}>Edytuj uprawnienia</Button>
                </AccordionBody>
            </AccordionItem>
            <PrivilegesModal projects={user.projects} show={showPrivilegesModal}
                             closeModal={() => setShowPrivilegesModal(false)}/>
        </Fragment>
    );
}

export default UserTab;
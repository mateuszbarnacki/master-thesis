import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import Button from "react-bootstrap/Button";
import AccordionItem from "react-bootstrap/AccordionItem";
import PrivilegesTable from "./PrivilegesTable";

function UserTab({user, index}) {
    return (
        <AccordionItem eventKey={index}>
            <AccordionHeader>{user.username}</AccordionHeader>
            <AccordionBody className="text-center">
                <PrivilegesTable projects={user.projects}/>
                <Button variant="dark" className="mt-3">Edytuj uprawnienia</Button>
            </AccordionBody>
        </AccordionItem>
    );
}

export default UserTab;
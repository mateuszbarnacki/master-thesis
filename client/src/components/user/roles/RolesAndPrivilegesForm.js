import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Form from "react-bootstrap/Form";
import PrivilegeTable from "./PrivilegeTable";

const mock = [
    {
        name: "Zanieczyszczenia Kraków",
        privileges: [true, false, false]
    },
    {
        name: "Projekt terenowy",
        privileges: [false, true, false]
    },
    {
        name: "Zanieczyszczenia Radom",
        privileges: [true, false, true]
    },
    {
        name: "Zanieczyszczenia Police",
        privileges: [true, true, true]
    },
    {
        name: "Klimat Szczecina",
        privileges: [false, false, true]
    },
    {
        name: "Test",
        privileges: [true, false, false]
    }
];

function RolesAndPrivilegesForm({projects, roles, update}) {
    return (
        <Form>
            <FormLabel as="h5" className="text-start">Role:</FormLabel>
            <Row xs={2}>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="reader-checkbox">Badacz</FormLabel>
                    {update ? <FormCheck id="reader-checkbox" defaultChecked={roles[0]}/> :
                        <FormCheck id="reader-checkbox" defaultChecked={roles[0]} disabled/>}
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="writer-checkbox">Twórca projektów</FormLabel>
                    {update ? <FormCheck id="writer-checkbox" defaultChecked={roles[1]}/> :
                        <FormCheck id="writer-checkbox" defaultChecked={roles[1]} disabled/>}
                </FormGroup>
            </Row>
            <FormLabel as="h5" className="text-start mt-4">Uprawnienia:</FormLabel>
            <PrivilegeTable projects={mock} userProjects={projects} update={update}/>
        </Form>
    );
}

export default RolesAndPrivilegesForm;
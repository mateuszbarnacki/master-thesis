import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Form from "react-bootstrap/Form";
import ActionsTable from "./ActionsTable";

const mock = [
    {
        name: "Zanieczyszczenia Kraków",
        actions: [true, false]
    },
    {
        name: "Projekt terenowy",
        actions: [false, true]
    },
    {
        name: "Zanieczyszczenia Radom",
        actions: [true, false]
    },
    {
        name: "Zanieczyszczenia Police",
        actions: [true, true]
    },
    {
        name: "Klimat Szczecina",
        actions: [false, false]
    },
    {
        name: "Test",
        actions: [true, false]
    }
];

function RolesAndActionsForm({projects, roles, update}) {
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
            <FormLabel as="h5" className="text-start mt-4">Dostępne akcje:</FormLabel>
            <ActionsTable projects={mock} userProjects={projects} update={update}/>
        </Form>
    );
}

export default RolesAndActionsForm;
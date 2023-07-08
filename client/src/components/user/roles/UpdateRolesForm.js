import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import UserProjectsList from "../UserProjectsList";

const mock = [
    "Zanieczyszczenia Kraków",
    "Projekt terenowy",
    "Zanieczyszczenia Radom",
    "Zanieczyszczenia Police",
    "Klimat Szczecina",
    "Test"
];

function UpdateRolesForm({projects, roles}) {
    return (
        <Form>
            <FormLabel as="h5" className="text-start">Role:</FormLabel>
            <Row xs={3}>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="reader-checkbox">Czytelnik</FormLabel>
                    <FormCheck id="reader-checkbox" defaultChecked={roles[0]}/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="writer-checkbox">Pisarz</FormLabel>
                    <FormCheck id="writer-checkbox" defaultChecked={roles[1]}/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="editor-checkbox">Edytor</FormLabel>
                    <FormCheck id="editor-checkbox" defaultChecked={roles[2]}/>
                </FormGroup>
            </Row>
            <FormLabel as="h5" className="text-start mt-4">Projekty:</FormLabel>
            <UserProjectsList projects={mock} userProjects={projects}/>
        </Form>
    );
}

export default UpdateRolesForm;
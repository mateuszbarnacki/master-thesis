import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";

function RolesForm({projects, roles}) {
    return (
        <Form>
            <FormLabel as="h5" className="text-start">Role:</FormLabel>
            <Row xs={3}>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="reader-checkbox">Czytelnik</FormLabel>
                    <FormCheck id="reader-checkbox" defaultChecked={roles[0]}
                               disabled/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="writer-checkbox">Pisarz</FormLabel>
                    <FormCheck id="writer-checkbox" defaultChecked={roles[1]}
                               disabled/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="editor-checkbox">Edytor</FormLabel>
                    <FormCheck id="editor-checkbox" defaultChecked={roles[2]}
                               disabled/>
                </FormGroup>
            </Row>
            <FormLabel as="h5" className="text-start mt-4">Projekty:</FormLabel>
            <ListGroup variant="flush" className="projects-form-list">
                {projects.map((item) =>
                    <ListGroupItem key={item} className="py-2 px-4" as="h6">
                        {item}
                    </ListGroupItem>)}
            </ListGroup>
        </Form>
    );
}

export default RolesForm;
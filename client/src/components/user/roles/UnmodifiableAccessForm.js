import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Form from "react-bootstrap/Form";
import UnmodifiableActionsTable from "./UnmodifiableActionsTable";
import {ResearcherRole, ProjectCreatorRole} from "../../../api/roles";

function UnmodifiableAccessForm({user}) {
    return (
        <Form>
            <FormLabel as="h5" className="text-start">Role:</FormLabel>
            <Row xs={2}>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="researcher-checkbox">Badacz</FormLabel>
                    <FormCheck id={user.username + "-researcher-checkbox"}
                               defaultChecked={user.roles.includes(ResearcherRole)}
                               disabled/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="project-creator-checkbox">Twórca projektów</FormLabel>
                    <FormCheck id={user.username + "-project-creator-checkbox"}
                               defaultChecked={user.roles.includes(ProjectCreatorRole)}
                               disabled/>
                </FormGroup>
            </Row>
            {user.roles.includes(ResearcherRole) ?
                (<>
                    <FormLabel as="h5" className="text-start mt-4">Widoczność akcji dla roli Badacz:</FormLabel>
                    <UnmodifiableActionsTable userProjects={user.projects}/>
                </>)
                : null}
        </Form>
    );
}

export default UnmodifiableAccessForm;
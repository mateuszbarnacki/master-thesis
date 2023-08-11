import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Form from "react-bootstrap/Form";
import UserProjectsList from "../UserProjectsList";
import {ResearcherRole, ProjectCreatorRole} from "../../../api/roles";

function AccessForm({user, updateCheckedProjects, handleAlert}) {
    return (
        <Form>
            <FormLabel as="h5" className="text-start">Role:</FormLabel>
            <Row xs={2}>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="researcher-checkbox">Badacz</FormLabel>
                    <FormCheck id={user.username + "-researcher-modal-checkbox"}
                               defaultChecked={user.roles.includes(ResearcherRole)}/>
                </FormGroup>
                <FormGroup className="mt-1 mb-1">
                    <FormLabel htmlFor="project-creator-checkbox">Twórca projektów</FormLabel>
                    <FormCheck id={user.username + "-project-creator-modal-checkbox"}
                               defaultChecked={user.roles.includes(ProjectCreatorRole)}/>
                </FormGroup>
            </Row>
            {user.roles.includes(ResearcherRole) ?
                (<>
                    <FormLabel as="h5" className="text-start mt-4">Udział w projektach:</FormLabel>
                    <UserProjectsList id="access-form-list"
                                      userProjects={user.projects.map(item => item.name)}
                                      updateCheckedProjects={(values) => updateCheckedProjects(values)}
                                      handleAlert={(value) => handleAlert(value)}/>
                </>)
                : null}
        </Form>
    );
}

export default AccessForm;
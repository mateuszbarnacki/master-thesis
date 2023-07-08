import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

function UserProjectsList({projects, userProjects}) {
    return (
        <ListGroup variant="flush" className="projects-roles-list">
            {projects.map((item) =>
                <ListGroupItem key={item} className="py-2 px-4">
                    {item}
                    <input type="checkbox" className="float-end custom-checkbox-input"
                           defaultChecked={userProjects && userProjects.includes(item)}/>
                </ListGroupItem>)}
        </ListGroup>
    );
}

export default UserProjectsList;
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import {Fragment, useState} from "react";
import {isStringNullOrEmpty} from "../project/addProject/FormValidator";

function UserProjectsList({projects, userProjects}) {
    const [projectNames, setProjectNames] = useState(projects);
    const [checkedProjects, setCheckedProjects] = useState(!!userProjects ? userProjects : []);
    const handleSearchOnChange = (event) => {
        const searchValue = event.target.value;
        if (isStringNullOrEmpty(searchValue)) {
            setProjectNames(projects);
        } else {
            const newList = projects.slice()
                .filter(value => value.match(searchValue + ".*"));
            setProjectNames(newList);
        }
    };
    const handleSearchOnKeyDown = (event) => {
        const searchValue = event.target.value;
        if (event.code === 'Space' && isStringNullOrEmpty(searchValue)) event.preventDefault();
    };
    const handleCheckboxOnChange = (event) => {
        const newCheckedProjects = checkedProjects.slice();
        if (event.target.checked) {
            newCheckedProjects.push(event.target.id.split('-')[0]);
        } else {
            const index = newCheckedProjects.indexOf(event.target.id.split('-')[0]);
            newCheckedProjects.splice(index, 1);
        }
        setCheckedProjects(newCheckedProjects);
    };

    return (
        <Fragment>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu" className="mt-4 mb-4"
                          onChange={(e) => handleSearchOnChange(e)}
                          onKeyDown={(e) => handleSearchOnKeyDown(e)}/>
            <ListGroup variant="flush" className="projects-roles-list">
                {projectNames.map((item) =>
                    <ListGroupItem key={item} className="py-2 px-4">
                        {item}
                        <input type="checkbox" id={item + "-checkbox"}
                               className="float-end custom-checkbox-input"
                               defaultChecked={checkedProjects && checkedProjects.includes(item)}
                               onChange={(e) => handleCheckboxOnChange(e)}/>
                    </ListGroupItem>)}
            </ListGroup>
        </Fragment>
    );
}

export default UserProjectsList;
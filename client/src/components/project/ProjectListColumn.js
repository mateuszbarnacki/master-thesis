import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {Fragment, useState} from "react";
import {isStringNullOrEmpty} from "./addProject/FormValidator";
import Col from "react-bootstrap/Col";

function ProjectListColumn({projectsList, handleListOnClick}) {
    const [list, setList] = useState(projectsList);
    const handleOnChange = (event) => {
        const searchValue = event.target.value;
        if (isStringNullOrEmpty(searchValue)) {
            setList(projectsList);
        } else {
            const newList = projectsList.slice().filter(value => value.name.match(searchValue + ".*"));
            setList(newList);
        }
    };
    const handleOnKeyDown = (event) => {
        const searchValue = event.target.value;
        if (event.code === 'Space' && isStringNullOrEmpty(searchValue)) event.preventDefault();
    };

    return (
        <Col className="project-column">
            <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu"
                          onChange={(e) => handleOnChange(e)}
                          onKeyDown={(e) => handleOnKeyDown(e)}/>
            <ListGroup variant="flush" className="projects-list mt-3 mb-3">
                {list.map(item =>
                    <ListGroupItem key={item.name}
                                   action
                                   variant="light"
                                   onClick={() => handleListOnClick(item)}>
                        {item.name}
                    </ListGroupItem>)}
            </ListGroup>
        </Col>
    );
}

export default ProjectListColumn;
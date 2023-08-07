import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {useEffect, useState} from "react";
import {isStringNullOrEmpty} from "./addProject/FormValidator";
import Col from "react-bootstrap/Col";
import * as C from "../../api/constants";
import * as P from "../../api/paths";

function ProjectListColumn({handleListOnClick, handleAlert}) {
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    const [projects, setProjects] = useState([]);
    const [list, setList] = useState([]);
    const handleOnChange = (event) => {
        const searchValue = event.target.value;
        if (isStringNullOrEmpty(searchValue)) {
            setList(projects);
        } else {
            const newList = projects.slice().filter(value => value.match(searchValue + ".*"));
            setList(newList);
        }
    };
    const handleOnKeyDown = (event) => {
        const searchValue = event.target.value;
        if (event.code === 'Space' && isStringNullOrEmpty(searchValue)) event.preventDefault();
    };
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem(C.localStorageAuthToken)
        }
    };

    useEffect(() => {
        if (roles.includes(C.AdminRole)) {
            fetch(P.base + P.projects + '/names', requestOptions)
                .then(res => res.json())
                .then(data => {
                    setProjects(data);
                    setList(data);
                })
                .catch(error => handleAlert(true));
        } else {
            fetch(P.base + P.users + '/' + window.localStorage.getItem(C.localStorageUser) + P.projects, requestOptions)
                .then(res => res.json())
                .then(data => {
                    setProjects(data);
                    setList(data);
                })
                .catch(error => handleAlert(true));
        }
    }, []);

    return (
        <Col className="project-column">
            <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu"
                          onChange={(e) => handleOnChange(e)}
                          onKeyDown={(e) => handleOnKeyDown(e)}/>
            <ListGroup variant="flush" className="projects-list mt-3 mb-3">
                {list.map(item =>
                    <ListGroupItem key={item}
                                   action
                                   variant="light"
                                   onClick={() => handleListOnClick(item)}>
                        {item}
                    </ListGroupItem>)}
            </ListGroup>
        </Col>
    );
}

export default ProjectListColumn;
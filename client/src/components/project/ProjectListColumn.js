import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {useEffect, useState} from "react";
import {isStringNullOrEmpty} from "./addProject/FormValidator";
import Col from "react-bootstrap/Col";
import * as C from "../../api/constants";
import * as P from "../../api/paths";

function ProjectListColumn({handleListOnClick, handleAlert, projects, changeProjects}) {
    const roles = !!window.localStorage.getItem(C.localStorageRoles) ?
        window.localStorage.getItem(C.localStorageRoles) : [];
    const [list, setList] = useState([]);
    const handleOnKeyDown = (event) => {
        const searchValue = event.target.value;
        if (event.code === 'Space' && isStringNullOrEmpty(searchValue)) {
            event.preventDefault();
        } else if (isStringNullOrEmpty(searchValue)) {
            setList(projects);
        } else {
            const newList = projects.slice();
            setList(newList.filter(value => value.match(searchValue + ".*")));
        }
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
                    changeProjects(data);
                    setList(data);
                })
                .catch(error => handleAlert(true));
        } else {
            fetch(P.base + P.users + '/' + window.localStorage.getItem(C.localStorageUser) + P.projects, requestOptions)
                .then(res => res.json())
                .then(data => {
                    const projects = data.map(item => ({
                        name: item.name,
                        actions: item.actions
                    }));
                    changeProjects(projects);
                    setList(projects);
                })
                .catch(error => handleAlert(true));
        }
    }, [projects]);

    return (
        <Col className="project-column">
            <Form.Label htmlFor="search">Wyszukaj projekt po nazwie:</Form.Label>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu"
                          onKeyDown={(e) => handleOnKeyDown(e)}/>
            <ListGroup variant="flush" className="projects-list mt-3 mb-3">
                {list.map(item =>
                    <ListGroupItem key={item.name ? item.name : item}
                                   action
                                   variant="light"
                                   onClick={() => handleListOnClick(item)}>
                        {item.name ? item.name : item}
                    </ListGroupItem>)}
            </ListGroup>
        </Col>
    );
}

export default ProjectListColumn;
import {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import {isStringNullOrEmpty} from "../project/addProject/FormValidator";
import * as P from "../../api/paths";
import {localStorageAuthToken} from "../../api/constants";
import {loginView} from "../../api/views";

function UserProjectsList({id, userProjects, updateCheckedProjects, handleAlert}) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectsCopy, setProjectsCopy] = useState([]);
    const [checkedProjects, setCheckedProjects] = useState(!!userProjects ? userProjects : []);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
        }
    };
    const handleSearchOnChange = (event) => {
        const searchValue = event.target.value;
        if (isStringNullOrEmpty(searchValue)) {
            setProjects(projectsCopy);
        } else {
            const newList = projectsCopy.slice().filter(value => value.match(searchValue + ".*"));
            setProjects(newList);
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
        updateCheckedProjects(newCheckedProjects);
    };

    useEffect(() => {
        updateCheckedProjects(checkedProjects.slice());
        fetch(P.server + P.projects + '/names', requestOptions)
            .then(res => {
                if (res.status === 401) {
                       navigate(loginView);
                }
                return res.json();
            })
            .then(data => {
                setProjects(data);
                setProjectsCopy(data);
            })
            .catch(() => handleAlert(true));
    }, []);

    return (
        <Fragment>
            <Form.Control type="text" id="search" placeholder="Nazwa projektu" className="mt-4 mb-4"
                          onChange={(e) => handleSearchOnChange(e)}
                          onKeyDown={(e) => handleSearchOnKeyDown(e)}/>
            <ListGroup id={id} variant="flush" className="projects-roles-list">
                {projects.map((item) =>
                    <ListGroupItem key={item} className="py-2 px-4">
                        {item}
                        <input type="checkbox" id={item + "-checkbox"}
                               className="float-end custom-checkbox-input"
                               defaultChecked={checkedProjects?.includes(item)}
                               onChange={(e) => handleCheckboxOnChange(e)}/>
                    </ListGroupItem>)}
            </ListGroup>
        </Fragment>
    );
}

export default UserProjectsList;
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import UserTab from "./UserTab";
import * as P from '../../api/paths';
import {localStorageAuthToken} from "../../api/constants";
import {loginView} from "../../api/views";

function UserList({showAlert}) {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState([]);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem(localStorageAuthToken)
        }
    };
    useEffect(() => {
        fetch(P.server + P.users + '/all', requestOptions)
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 200) {
                    return res.json();
                } else {
                    return res.json().then(obj => {
                       throw new Error(obj.message)
                    });
                }
            })
            .then(data => setUsersList(data))
            .catch((error) => showAlert(error.message));
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Text as="h4" className="mt-1">Zarządzaj uprawnieniami użytkowników</Card.Text>
            </Card.Body>
            <Accordion className="border-light ms-3 me-3 mb-3 mt-2">
                {usersList.map((user, index) =>
                    <UserTab user={user}
                             key={index}
                             index={index}
                             showAlert={(value) => showAlert(value)}/>)}
            </Accordion>
        </Card>
    );
}

export default UserList;
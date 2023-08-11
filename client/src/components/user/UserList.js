import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import UserTab from "./UserTab";
import * as P from '../../api/paths';
import {localStorageAuthToken} from "../../api/constants";
import {loginView} from "../../api/views";

function UserList({handleAlert}) {
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
                }
                return res.json();
            })
            .then(data => setUsersList(data))
            .catch(() => {handleAlert(true)});
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
                             handleAlert={(value) => handleAlert(value)}/>)}
            </Accordion>
        </Card>
    );
}

export default UserList;
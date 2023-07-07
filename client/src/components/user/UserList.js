import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import UserTab from "./UserTab";

const mock = [
    {
        username: "Użytkownik Testowy",
        projects: [
            {
                name: "Zanieczyszczenia Kraków",
                roles: [true, false, true]
            },
            {
                name: "Projekt terenowy",
                roles: [true, true, false]
            },
            {
                name: "Zanieczyszczenia Radom",
                roles: [true, false, false]
            }
        ]
    },
    {
        username: "Adam",
        projects: [
            {
                name: "Zanieczyszczenia Police",
                roles: [true, true, true]
            },
            {
                name: "Klimat Szczecina",
                roles: [true, true, false]
            }
        ]
    }
];

function UserList() {
    return (
        <Card>
            <Card.Body>
                <Card.Text as="h4" className="mt-1">Zarządzaj uprawnieniami użytkowników</Card.Text>
            </Card.Body>
            <Accordion className="border-light ms-3 me-3 mb-3 mt-2">
                {mock.map((user, index) => <UserTab user={user} key={index} index={index}/>)}
            </Accordion>
        </Card>
    );
}

export default UserList;
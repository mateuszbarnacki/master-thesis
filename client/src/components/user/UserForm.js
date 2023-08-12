import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import UserProjectsList from "./UserProjectsList";
import * as P from "../../api/paths";
import {loginView} from "../../api/views";
import {useNavigate} from "react-router-dom";

function UserForm({showAlert}) {
    const navigate = useNavigate();
    const [isPasswordInvalidRepeated, setIsPasswordInvalidRepeated] = useState(false);
    const [checkedProjects, setCheckedProjects] = useState([]);

    function handleRepeatedPasswordChange(event) {
        const password = document.getElementById("password").value;
        const repeatedPassword = document.getElementById("repeatedPassword").value;
        if (password !== repeatedPassword) {
            event.preventDefault();
            event.stopPropagation();
        }
        setIsPasswordInvalidRepeated(password !== repeatedPassword);
    }

    const validateEmail = (email) => {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const repeatedPassword = e.target.repeatedPassword.value;
        if (password !== repeatedPassword || !validateEmail(email)) {
            e.stopPropagation();
            return;
        }
        const userDto = {
            username: e.target.login.value,
            email: email,
            description: e.target.information.value,
            password: repeatedPassword,
            roles: [],
            projects: checkedProjects
        };
        fetch(P.server + P.users, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userDto)
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 201) {
                    setCheckedProjects([]);
                    window.location.reload();
                } else {
                    return res.json().then(obj => {
                        throw new Error(obj.message)
                    });
                }
            })
            .catch((error) => showAlert(error.message));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Text as="h4" className="m-1">Dodaj nowego użytkownika</Card.Text>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="login" className="mb-3" as="h5">Login:</FormLabel>
                        <FormControl type="text" id="login" placeholder="Podaj login" required/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="email" className="mb-3" as="h5">Email:</FormLabel>
                        <FormControl type="text" id="email" placeholder="Podaj email" required/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="information" className="mb-3" as="h5">
                            Informacje o użytkowniku:
                        </FormLabel>
                        <FormControl as="textarea" rows={3} id="information"
                                     placeholder="Podaj dodatkowe informacje na temat tego użytkownika"/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel className="mb-3" as="h5">Uczestnictwo w projektach:</FormLabel>
                        <UserProjectsList id="user-form-list"
                                          handleAlert={(value) => showAlert(value)}
                                          updateCheckedProjects={(values) => setCheckedProjects(values)}/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="password" className="mb-3" as="h5">Hasło:</FormLabel>
                        <FormControl type="password" id="password" placeholder="Podaj hasło"
                                     onChange={handleRepeatedPasswordChange} required/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="repeatedPassword" className="mb-3" as="h5">Powtórz hasło:</FormLabel>
                        <FormControl type="password" id="repeatedPassword"
                                     placeholder="Powtórz hasło"
                                     isInvalid={isPasswordInvalidRepeated}
                                     onChange={handleRepeatedPasswordChange} required/>
                        <FormControl.Feedback type="invalid">
                            Hasła nie zgadzają się ze sobą
                        </FormControl.Feedback>
                        <Button variant="dark" className="mt-4" type="submit">Dodaj użytkownika</Button>
                    </FormGroup>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UserForm;
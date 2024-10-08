import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import * as P from "../../api/paths";
import {localStorageAuthToken, localStorageRoles, localStorageUser} from "../../api/constants";
import {projectsListView} from "../../api/views";

function LoginForm({setLoginError}) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const authenticationDto = {
            username: e.target.login.value,
            password: e.target.password.value
        };
        fetch(P.server + P.authentication,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(authenticationDto)
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Authorization error');
                }
            })
            .then(json => {
                setLoginError(false);
                const token = json.token;
                const roles = json.roles;
                const user = json.username;
                window.localStorage.setItem(localStorageAuthToken, token);
                window.localStorage.setItem(localStorageRoles, roles);
                window.localStorage.setItem(localStorageUser, user);
                navigate(projectsListView);
            })
            .catch(() => setLoginError(true));
    };

    return (
        <Card className="m-4" style={{width: "80vh"}}>
            <CardHeader as="h5" className="bg-white border-bottom-0 mt-3">Zaloguj się</CardHeader>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3 ms-3 me-3">
                        <FloatingLabel controlId="login" label="Login">
                            <FormControl type="text" placeholder="Login" required/>
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <FloatingLabel controlId="password" label="Hasło">
                            <FormControl type="password" placeholder="Hasło" required/>
                        </FloatingLabel>
                    </FormGroup>
                    <Button variant="dark" className="m-1" type="submit">Zaloguj</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginForm;
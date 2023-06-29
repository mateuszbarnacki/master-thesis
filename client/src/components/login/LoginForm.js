import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import {FloatingLabel} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function LoginForm() {
    return (
        <Card className="m-4" style={{width: "80vh"}}>
            <CardHeader as="h5" className="bg-white border-bottom-0 mt-3">Zaloguj
                się</CardHeader>
            <Card.Body>
                <Form>
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
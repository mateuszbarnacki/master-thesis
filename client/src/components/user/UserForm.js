import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState} from "react";

function UserForm() {
    const [isPasswordInvalidRepeated, setIsPasswordInvalidRepeated] = useState(false);
    function handleRepeatedPasswordChange(event) {
        const password = document.getElementById("password").value;
        const repeatedPassword = document.getElementById("repeatedPassword").value;
        if (password !== repeatedPassword) {
            event.preventDefault();
            event.stopPropagation();
        }
        setIsPasswordInvalidRepeated(password !== repeatedPassword);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text as="h5" className="m-1">Dodaj nowego użytkownika</Card.Text>
                <Form>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="login">Login:</FormLabel>
                        <FormControl type="text" id="login" placeholder="Podaj login" required/>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <FormLabel htmlFor="email">Email:</FormLabel>
                        <FormControl type="text" id="email" placeholder="Podaj email" required/>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <FormLabel htmlFor="information">Informacje o użytkowniku:</FormLabel>
                        <FormControl as="textarea" rows={3} placeholder="Podaj dodatkowe informacje na temat tego użytkownika"/>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <FormLabel htmlFor="password">Hasło:</FormLabel>
                        <FormControl type="password" id="password" placeholder="Podaj hasło" onChange={handleRepeatedPasswordChange} required/>
                    </FormGroup>
                    <FormGroup className="m-3">
                        <FormLabel htmlFor="repeatedPassword">Powtórz hasło:</FormLabel>
                        <FormControl type="password" id="repeatedPassword" placeholder="Powtórz hasło" isInvalid={isPasswordInvalidRepeated} onChange={handleRepeatedPasswordChange} required/>
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
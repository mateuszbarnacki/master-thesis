import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

const mock = [
    "Zanieczyszczenia Kraków",
    "Projekt terenowy",
    "Zanieczyszczenia Radom",
    "Zanieczyszczenia Police",
    "Klimat Szczecina",
    "Test"
];

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
                <Card.Text as="h4" className="m-1">Dodaj nowego użytkownika</Card.Text>
                <Form>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="login" className="mb-3" as="h5">Login:</FormLabel>
                        <FormControl type="text" id="login" placeholder="Podaj login" required/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="email" className="mb-3" as="h5">Email:</FormLabel>
                        <FormControl type="text" id="email" placeholder="Podaj email" required/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel htmlFor="information" className="mb-3" as="h5">Informacje o użytkowniku:</FormLabel>
                        <FormControl as="textarea" rows={3} id="information"
                                     placeholder="Podaj dodatkowe informacje na temat tego użytkownika"/>
                    </FormGroup>
                    <FormGroup className="m-3 mt-4">
                        <FormLabel className="mb-3" as="h5">Uczestnictwo w projektach:</FormLabel>
                        <ListGroup variant="flush" className="projects-roles-list">
                            {mock.map((item) =>
                                <ListGroupItem key={item} className="py-2 px-4">
                                    {item}
                                    <input type="checkbox" className="float-end custom-checkbox-input"/>
                                </ListGroupItem>)}
                        </ListGroup>
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
                        <Button variant="dark" className="mt-4" type="submit">Dodaj
                            użytkownika</Button>
                    </FormGroup>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UserForm;
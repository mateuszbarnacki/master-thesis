import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import FormSelect from "react-bootstrap/FormSelect";
import {useState} from "react";
import {isStringNullOrEmpty} from "./FormValidator";

function ProjectForm() {
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [isAcronymInvalid, setIsAcronymInvalid] = useState(false);
    const handleOnChangeName = (e) => {
        const fieldValue = document.getElementById("name").value;
        setIsNameInvalid(isStringNullOrEmpty(fieldValue));
    }
    const handleOnChangeAcronym = (e) => {
        const fieldValue = document.getElementById("acronym").value;
        setIsAcronymInvalid(isStringNullOrEmpty(fieldValue));
    }

    return (
        <Card className="border-black mt-5 ms-3 me-3 bg-light-subtle">
            <CardHeader>Etap 1. Uzupełnij informacje o projekcie</CardHeader>
            <Card.Body>
                <Form>
                    <FormGroup>
                        <FormLabel htmlFor="name">Nazwa projektu:</FormLabel>
                        <FormControl required id="name" type="text" placeholder="Nazwa projektu" onChange={handleOnChangeName} isInvalid={isNameInvalid}/>
                        <FormControl.Feedback type="invalid">
                            Proszę uzupełnić nazwę projektu
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="acronym">Akronim:</FormLabel>
                        <FormControl required id="acronym" type="text" placeholder="Akronim" onChange={handleOnChangeAcronym} isInvalid={isAcronymInvalid}/>
                        <FormControl.Feedback type="invalid">
                            Proszę uzupełnić akronim
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="description">Opis projektu:</FormLabel>
                        <FormControl id="description" type="text" as="textarea" rows={3} placeholder="Opis projektu"/>
                    </FormGroup>
                    <Row xs={3} className="mt-3">
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="timeMode">Tryb pomiaru:</FormLabel>
                            <FormSelect id="timeMode">
                                <option>offline</option>
                                <option>online</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="spatialMode">Rodzaj pomiaru:</FormLabel>
                            <FormSelect id="spatialMode">
                                <option>stacjonarny</option>
                                <option>mobilny 2D</option>
                                <option>mobilny 3D</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="measurementMode">Typ pomiaru:</FormLabel>
                            <FormSelect id="measurementMode">
                                <option>pojedynczy</option>
                                <option>sieć</option>
                            </FormSelect>
                        </FormGroup>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProjectForm;
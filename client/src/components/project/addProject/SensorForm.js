import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import MeasurementForm from "./MeasurementForm";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {isNumberOutOfRange, isStringNullOrEmpty} from "./FormValidator";

function SensorForm() {
    const [isSensorIdInvalid, setIsSensorIdInvalid] = useState(false);
    const [isLongitudeInvalid, setIsLongitudeInvalid] = useState(false);
    const [isLatitudeInvalid, setIsLatitudeInvalid] = useState(false);
    const handleOnChangeSensorId = (event) => {
        const sensorId = document.getElementById("sensorId").value;
        setIsSensorIdInvalid(isStringNullOrEmpty(sensorId));
    }
    const handleOnChangeLongitude = (event) => {
        const longitude = document.getElementById("longitude").value;
        setIsLongitudeInvalid(isNumberOutOfRange(longitude, -180.0, 180.0));
    }
    const handleOnChangeLatitude = (event) => {
        const latitude = document.getElementById("latitude").value;
        setIsLatitudeInvalid(isNumberOutOfRange(latitude, -90.0, 90.0));
    }

    return (
        <Card className="border-black m-3 bg-light-subtle">
            <CardHeader>Etap 2. Uzupełnij informacje o czujnikach</CardHeader>
            <Card.Body>
                <Form className="m-1 bg-light-subtle">
                    <FormLabel as="h4" className="m-1">
                        Czujnik
                        <CloseButton className="float-end"/>
                    </FormLabel>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="sensorId">ID urządzenia pomiarowego:</FormLabel>
                        <FormControl required
                                     id="sensorId"
                                     type="text"
                                     placeholder="Identyfikator urządzenia pomiarowego"
                                     onChange={handleOnChangeSensorId}
                                     isInvalid={isSensorIdInvalid}/>
                        <FormControl.Feedback type="invalid">
                            Proszę uzupełnić identyfikator urządzenia pomiarowego
                        </FormControl.Feedback>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="sensorDescription">Opis czujnika:</FormLabel>
                        <FormControl id="sensorDescription" type="text" as="textarea" rows={3} placeholder="Opis projektu"/>
                    </FormGroup>
                    <FormLabel as="h5" className="mt-3">Położenie czujnika:</FormLabel>
                    <Row xs={3}>
                        <FormGroup className="mt-2 mb-3">
                            <FormLabel htmlFor="longitude">Długość geograficzna:</FormLabel>
                            <FormControl id="longitude"
                                         type="number"
                                         onChange={handleOnChangeLongitude}
                                         isInvalid={isLongitudeInvalid}
                                         placeholder="Długość geograficzna"/>
                            <FormControl.Feedback type="invalid">
                                Długość geograficzna poza zakresem [-180°, 180°]
                            </FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className="mt-2 mb-3">
                            <FormLabel htmlFor="latitude">Szerokość
                                geograficzna:</FormLabel>
                            <FormControl id="latitude"
                                         type="number"
                                         onChange={handleOnChangeLatitude}
                                         isInvalid={isLatitudeInvalid}
                                         placeholder="Szerokość geograficzna"/>
                            <FormControl.Feedback type="invalid">
                                Długość geograficzna poza zakresem [-90°, 90°]
                            </FormControl.Feedback>
                        </FormGroup>
                        <FormGroup className="mt-2 mb-3">
                            <FormLabel htmlFor="altitude">Wysokość n.p.m.:</FormLabel>
                            <FormControl id="altitude" type="number" placeholder="Wysokość"/>
                        </FormGroup>
                    </Row>
                    <MeasurementForm/>
                    <Button variant="outline-dark" className="ms-2 me-4 rounded-5 float-end">+</Button>
                    <div className="float-end mt-2"><h5>Dodaj czujnik</h5></div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default SensorForm;
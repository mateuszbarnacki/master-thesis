import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import ParameterForm from "./ParameterForm";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {isNumberOutOfRange, isStringNullOrEmpty} from "./FormValidator";

function SensorForm({id, handleAddSensorClick, handleRemoveSensorClick, isAddSensorButtonVisible}) {
    const [measurements, setMeasurements] = useState(Array.of(0));
    const [counter, setCounter] = useState(1);
    const [isSensorIdInvalid, setIsSensorIdInvalid] = useState(false);
    const [isLongitudeInvalid, setIsLongitudeInvalid] = useState(false);
    const [isLatitudeInvalid, setIsLatitudeInvalid] = useState(false);
    const handleOnChangeSensorId = (event) => {
        const sensorId = document.getElementById("sensorId").value;
        setIsSensorIdInvalid(isStringNullOrEmpty(sensorId));
    };
    const handleOnChangeLongitude = (event) => {
        const longitude = document.getElementById("longitude").value;
        setIsLongitudeInvalid(isNumberOutOfRange(longitude, -180.0, 180.0));
    };
    const handleOnChangeLatitude = (event) => {
        const latitude = document.getElementById("latitude").value;
        setIsLatitudeInvalid(isNumberOutOfRange(latitude, -90.0, 90.0));
    };
    const handleAddMeasurementClick = () => {
        const newMeasurements = measurements.slice();
        newMeasurements.push(counter);
        setMeasurements(newMeasurements);
        setCounter(counter + 1);
    };
    const handleRemoveMeasurementClick = (id) => {
        const newMeasurements = measurements.slice();
        newMeasurements.splice(id, 1);
        if (newMeasurements.length === 0) {
            newMeasurements.push(counter);
            setCounter(counter + 1);
        }
        setMeasurements(newMeasurements);
    };

    return (
        <Form className="m-1 bg-light-subtle">
            <FormLabel as="h4" className="m-1">
                Czujnik #{id + 1}
                <CloseButton className="float-end" onClick={handleRemoveSensorClick}/>
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
                <FormControl id="sensorDescription" type="text" as="textarea" rows={3}
                             placeholder="Opis projektu"/>
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
            <Card className="border-black m-3 bg-light-subtle">
                <CardHeader>
                    Etap 3. Uzupełnij informacje o parametrach pomiarowych tego czujnika
                </CardHeader>
                <Card.Body>
                    {measurements.map((measurementId, index) =>
                        <ParameterForm id={index}
                                       key={"measurement-" + measurementId}
                                       handleAddMeasurementClick={() => handleAddMeasurementClick()}
                                       handleRemoveMeasurementClick={() => handleRemoveMeasurementClick(index)}
                                       isAddMeasurementButtonVisible={index === measurements.length - 1}/>)}
                </Card.Body>
            </Card>
            <div style={isAddSensorButtonVisible ? {} : {display: "none"}}>
                <Button variant="outline-dark" className="ms-2 me-4 rounded-5 float-end" onClick={handleAddSensorClick}>+</Button>
                <h5 className="float-end mt-2">Dodaj czujnik</h5>
            </div>
        </Form>
    );
}

export default SensorForm;
import Card from "react-bootstrap/Card";
import {Fragment, useState} from "react";
import Button from "react-bootstrap/Button";
import SensorForm from "./SensorForm";
import Menu from "../../Menu";
import ProjectForm from "./ProjectForm";
import CardHeader from "react-bootstrap/CardHeader";
import Footer from "../../Footer";
import {useNavigate} from "react-router-dom";
import {validateProject} from "./FormValidator";
import * as P from "../../../api/paths";
import Alert from "react-bootstrap/Alert";
import * as C from "../../../api/constants";

function AddProjectView() {
    const navigate = useNavigate();
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ids, setIds] = useState(Array.of(0));
    const [counter, setCounter] = useState(1);
    const [spatialMode, setSpatialMode] = useState("STATIONARY");
    const alert = (
        <Alert variant="danger" dismissible
               onClose={() => {
                   setIsAlert(false);
                   setAlertMessage('');
               }}>
            <Alert.Heading>Błąd tworzenia projektu</Alert.Heading>
            Podczas tworzenia projektu wykryto następujące błędy: {alertMessage}
        </Alert>
    );
    const handleAddSensorClick = () => {
        const newIds = ids.slice();
        newIds.push(counter);
        setIds(newIds);
        setCounter(counter + 1);
    };
    const handleRemoveSensorClick = (id) => {
        const newIds = ids.slice();
        newIds.splice(id, 1);
        if (newIds.length === 0) {
            newIds.push(counter);
            setCounter(counter + 1);
        }
        setIds(newIds);
    };
    const handleSaveClick = () => {
        const name = document.getElementById('name').value;
        const acronym = document.getElementById('acronym').value;
        const description = document.getElementById('description').value;
        const timeMode = document.getElementById('timeMode').value;
        const spatialMode = document.getElementById('spatialMode').value;
        const measurementMode = document.getElementById('measurementMode').value;
        const sensors = [];
        for (let i = 0; i < ids.length; i++) {
            const sensorId = document.getElementById('sensorId-' + i).value;
            const longitude = !!document.getElementById('longitude-' + i) ?
                document.getElementById('longitude-' + i).value : null;
            const latitude = !!document.getElementById('latitude-' + i) ?
                document.getElementById('latitude-' + i).value : null;
            const altitude = !!document.getElementById('altitude-' + i) ?
                document.getElementById('altitude-' + i).value : null;
            let j = 0;
            let measurement = document.getElementById('measurement-' + i + "-" + j);
            const measurements = [];
            while (measurement) {
                const measurementName = document.getElementById('measurementName-' + i + '-' + j).value;
                const measurementUnit = document.getElementById('measurementUnit-' + i + '-' + j).value;
                const measurementDescription = document.getElementById('measurementDescription-' + i + '-' + j).value;
                const aggregate = document.getElementById('aggregate-' + i + '-' + j).value;
                const aggregationInterval = document.getElementById('aggregationInterval-' + i + '-' + j).value;
                const maxBreak = document.getElementById('maxBreak-' + i + '-' + j).value;
                const validate = document.getElementById('validate-' + i + '-' + j).value;
                const minValue = document.getElementById('minValue-' + i + '-' + j).value;
                const maxValue = document.getElementById('maxValue-' + i + '-' + j).value;
                const range = {
                    min: parseFloat(minValue),
                    max: parseFloat(maxValue)
                };
                const errorValue = document.getElementById('errorValue-' + i + '-' + j).value;
                measurements.push({
                    name: measurementName,
                    description: measurementDescription,
                    unit: measurementUnit,
                    range: range,
                    validate: (validate === 'true'),
                    errorValue: parseInt(errorValue),
                    aggregate: (aggregate === 'true'),
                    aggregationInterval: aggregationInterval,
                    maxBreak: parseInt(maxBreak)
                });
                measurement = document.getElementById('measurement-' + i + "-" + ++j);
            }
            sensors.push({
                deviceId: sensorId,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                altitude: parseFloat(altitude),
                measurementSchema: {
                    measurements: measurements
                }
            });
        }
        const projectDto = {
            name: name,
            acronym: acronym,
            description: description,
            timeMode: timeMode,
            spatialMode: spatialMode,
            measurementMode: measurementMode,
            sensors: sensors
        };
        console.log(projectDto);
        const validationResult = validateProject(projectDto);
        if (validationResult.length > 0) {
            const errorMessage = validationResult.join('\n');
            setAlertMessage(errorMessage);
            setIsAlert(true);
            return;
        }
        fetch(P.base + P.projects, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem(C.localStorageAuthToken),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectDto)
        })
            .then(res => {
                if (res.status === 401) {
                    navigate('/');
                } else if (res.status === 201) {
                    navigate('/list');
                } else {
                    return res.json().then(obj => {throw new Error(obj.message)});
                }
            })
            .catch(error => {
                setAlertMessage(error.message);
                setIsAlert(true);
            });
    };

    return (
        <Fragment>
            <Menu/>
            {isAlert ? alert : null}
            <Card className="border-black"
                  style={{
                      marginLeft: "4vw",
                      marginRight: "4vw",
                      marginTop: "2vh",
                      marginBottom: "2vh"
                  }}>
                <Card.Body>
                    <Card.Text as="h4">Dodaj nowy projekt</Card.Text>
                    <ProjectForm changeSpatialMode={(value) => setSpatialMode(value)}/>
                    <Card className="border-black m-3 bg-light-subtle">
                        <CardHeader>Etap 2. Uzupełnij informacje o czujnikach</CardHeader>
                        <Card.Body>
                            {ids.map((sensorId, index) =>
                                <SensorForm id={index}
                                            key={"sensor-" + sensorId}
                                            handleAddSensorClick={() => handleAddSensorClick()}
                                            handleRemoveSensorClick={() => handleRemoveSensorClick(index)}
                                            isAddSensorButtonVisible={index === ids.length - 1}
                                            spatialMode={spatialMode}/>)}
                        </Card.Body>
                    </Card>
                    <Button className="me-3 rounded-5 float-end"
                            variant="dark"
                            onClick={handleSaveClick}>Zapisz projekt</Button>
                </Card.Body>
            </Card>
            <Footer/>
        </Fragment>
    );
}

export default AddProjectView;
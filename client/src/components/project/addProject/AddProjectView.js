import {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import SensorForm from "./SensorForm";
import Menu from "../../Menu";
import ProjectForm from "./ProjectForm";
import Footer from "../../Footer";
import {validateProject} from "./FormValidator";
import * as P from "../../../api/paths";
import {loginView, projectsListView} from "../../../api/views";
import {localStorageAuthToken} from "../../../api/constants";
import * as ProjectBuilder from "../addProject/ProjectBuilder";

function AddProjectView() {
    const navigate = useNavigate();
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [ids, setIds] = useState(Array.of(0));
    const [counter, setCounter] = useState(1);
    const [spatialMode, setSpatialMode] = useState("STATIONARY");
    const [measurementMode, setMeasurementMode] = useState("SINGLE");
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
        const projectDto = ProjectBuilder.buildProject(ids.length);
        const validationResult = validateProject(projectDto);
        if (validationResult.length > 0) {
            const errorMessage = validationResult.join('\n');
            setAlertMessage(errorMessage);
            setIsAlert(true);
            return;
        }
        fetch(P.server + P.projects, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem(localStorageAuthToken),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectDto)
        })
            .then(res => {
                if (res.status === 401) {
                    navigate(loginView);
                } else if (res.status === 201) {
                    navigate(projectsListView);
                } else {
                    return res.json().then(obj => {
                        throw new Error(obj.message)
                    });
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
                    <ProjectForm changeSpatialMode={(value) => setSpatialMode(value)}
                                 changeMeasurementMode={(value) => setMeasurementMode(value)}/>
                    <Card className="border-black m-3 bg-light-subtle">
                        <CardHeader>Etap 2. Uzupełnij informacje o czujnikach</CardHeader>
                        <Card.Body>
                            {ids.map((sensorId, index) =>
                                <SensorForm id={index}
                                            key={"sensor-" + sensorId}
                                            handleAddSensorClick={() => handleAddSensorClick()}
                                            handleRemoveSensorClick={() => handleRemoveSensorClick(index)}
                                            isAddSensorButtonVisible={measurementMode !== 'SINGLE' && index === ids.length - 1}
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
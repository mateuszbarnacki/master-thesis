import Card from "react-bootstrap/Card";
import ProjectForm from "../addProject/ProjectForm";
import CardHeader from "react-bootstrap/CardHeader";
import SensorForm from "../addProject/SensorForm";
import {Fragment, useState} from "react";

function CloneProjectForm({project, changeProjectLength}) {
    const [sensors, setSensors] = useState(project ? project.sensors : {deviceId: 0});
    const [counter, setCounter] = useState(project ? project.sensors.length + 1 : 1);
    const [cloneSpatialMode, setCloneSpatialMode] = useState(project.spatialMode);
    const [cloneMeasurementMode, setCloneMeasurementMode] = useState(project.measurementMode);
    const handleAddSensorClick = () => {
        const newIds = sensors.slice();
        newIds.push({deviceId: counter});
        setSensors(newIds);
        setCounter(counter + 1);
        changeProjectLength(newIds.length);
    };
    const handleRemoveSensorClick = (id) => {
        const newIds = sensors.slice();
        newIds.splice(id, 1);
        if (newIds.length === 0) {
            newIds.push({deviceId: counter});
            setCounter(counter + 1);
        }
        setSensors(newIds);
        changeProjectLength(newIds.length);
    };

    return (
        <Fragment>
            <ProjectForm name={project.name} acronym={project.acronym}
                         description={project.description} timeMode={project.timeMode}
                         spatialMode={project.spatialMode} measurementMode={project.measurementMode}
                         changeSpatialMode={(value) => setCloneSpatialMode(value)}
                         changeMeasurementMode={(value) => setCloneMeasurementMode(value)}/>
            <Card className="border-black m-3 bg-light-subtle">
                <CardHeader>Etap 2. Uzupełnij informacje o czujnikach</CardHeader>
                <Card.Body>
                    {sensors.map((sensor, index) =>
                        <SensorForm id={index}
                                    key={"sensor-" + sensor.deviceId}
                                    sensor={sensor}
                                    handleAddSensorClick={() => handleAddSensorClick()}
                                    handleRemoveSensorClick={() => handleRemoveSensorClick(index)}
                                    isAddSensorButtonVisible={cloneMeasurementMode !== 'SINGLE' && index === sensors.length - 1}
                                    spatialMode={cloneSpatialMode}/>)}
                </Card.Body>
            </Card>
        </Fragment>
    );
}

export default CloneProjectForm;
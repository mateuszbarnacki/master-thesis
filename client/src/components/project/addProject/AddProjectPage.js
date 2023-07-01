import Card from "react-bootstrap/Card";
import {Fragment, useState} from "react";
import Button from "react-bootstrap/Button";
import SensorForm from "./SensorForm";
import Menu from "../../Menu";
import ProjectForm from "./ProjectForm";
import CardHeader from "react-bootstrap/CardHeader";

function AddProjectPage() {
    const [ids, setIds] = useState(Array.of(0));
    const [counter, setCounter] = useState(1);
    const handleAddSensorClick = () => {
        const newIds = ids.slice();
        newIds.push(counter);
        setIds(newIds);
        setCounter(counter+1);
    };
    const handleRemoveSensorClick = (id) => {
        const newIds = ids.slice();
        newIds.splice(id, 1);
        if (newIds.length === 0) {
            newIds.push(counter);
            setCounter(counter+1);
        }
        setIds(newIds);
    };

    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Card className="border-black"
                  style={{marginLeft: "4vw", marginRight: "4vw", marginTop: "2vh", marginBottom: "2vh"}}>
                <Card.Body>
                    <Card.Text as="h4">Dodaj nowy projekt</Card.Text>
                    <ProjectForm/>
                    <Card className="border-black m-3 bg-light-subtle">
                        <CardHeader>Etap 2. Uzupełnij informacje o czujnikach</CardHeader>
                        <Card.Body>
                            {ids.map((sensorId, index) => <SensorForm id={index}
                                                             key={"sensor-" + sensorId}
                                                             onAddSensorClick={() => handleAddSensorClick()}
                                                             onRemoveSensorClick={() => handleRemoveSensorClick(index)}
                                                             isAddButtonVisible={index === ids.length-1}/>)}
                        </Card.Body>
                    </Card>
                    <Button variant="dark" className="me-3 rounded-5 float-end">Zapisz projekt</Button>
                </Card.Body>
            </Card>
        </Fragment>
    );
}

export default AddProjectPage;
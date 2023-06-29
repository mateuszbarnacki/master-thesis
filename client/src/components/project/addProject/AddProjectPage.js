import Card from "react-bootstrap/Card";
import {Fragment} from "react";
import Button from "react-bootstrap/Button";
import SensorForm from "./SensorForm";
import Menu from "../../Menu";
import ProjectForm from "./ProjectForm";

function AddProjectPage() {
    function handleClick(event) {

    }

    return (
        <Fragment>
            <Menu isLogged={true} canRead={true} canAdd={true}/>
            <Card className="border-black"
                  style={{marginLeft: "4vw", marginRight: "4vw", marginTop: "2vh", marginBottom: "2vh"}}>
                <Card.Body>
                    <Card.Text as="h4">Dodaj nowy projekt</Card.Text>
                    <ProjectForm/>
                    <SensorForm/>
                    <Button variant="dark" className="me-3 rounded-5 float-end">Zapisz projekt</Button>
                </Card.Body>
            </Card>
        </Fragment>
    );
}

export default AddProjectPage;
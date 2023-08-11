import Table from "react-bootstrap/Table";
import * as C from "../../../api/constants";

function ActionsTable({userProjects}) {
    return (
        <Table id="modal-table" className="m-1">
            <thead className="border-black">
            <tr>
                <th>#</th>
                <th>Nazwa projektu</th>
                <th>Dodanie pomiaru</th>
                <th>Czytanie pomiaru</th>
            </tr>
            </thead>
            <tbody>
            {
                userProjects.map((project, projectIndex) => (
                    <tr key={project.name}>
                        <td key={project.name + ' ' + userProjects.length}>{projectIndex + 1}</td>
                        <td style={{display: 'none'}}>{project.id}</td>
                        <td key={project.name + '-' + userProjects.length}>{project.name}</td>
                        <td key={project.name + '-Add_Measurement-modal'}>
                            <input type="checkbox"
                                   className="custom-checkbox-input"
                                   defaultChecked={project.actions.includes(C.AddMeasurementAction)}/>
                        </td>
                        <td key={project.name + '-Read_Measurement-modal'}>
                            <input type="checkbox"
                                   className="custom-checkbox-input"
                                   defaultChecked={project.actions.includes(C.ReadMeasurementsAction)}/>
                        </td>
                    </tr>))
            }
            </tbody>
        </Table>
    );
}

export default ActionsTable;
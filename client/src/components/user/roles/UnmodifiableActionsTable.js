import Table from "react-bootstrap/Table";
import {AddMeasurementAction, ReadMeasurementsAction} from "../../../api/actions";

function UnmodifiableActionsTable({userProjects}) {
    return (
        <Table id="form-table" className="m-1">
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
                        <td key={project.name + '-Add_Measurement'}>
                            {project.actions.includes(AddMeasurementAction) ? 'x' : null}
                        </td>
                        <td key={project.name + '-Read_Measurement'}>
                            {project.actions.includes(ReadMeasurementsAction) ? 'x' : null}
                        </td>
                    </tr>))
            }
            </tbody>
        </Table>
    );
}

export default UnmodifiableActionsTable;
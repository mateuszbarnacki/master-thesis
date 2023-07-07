import Table from "react-bootstrap/Table";
import FormCheck from "react-bootstrap/FormCheck";

function PrivilegesTable({projects, update}) {
    return (
        <Table className="m-1">
            <thead className="border-black">
            <tr>
                <th>#</th>
                <th>Nazwa projektu</th>
                <th>Czytanie</th>
                <th>Klonowanie</th>
                <th>Dodanie pomiaru</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project, projectIndex) => (
                <tr>
                    <td>{projectIndex+1}</td>
                    <td>{project.name}</td>
                    {project.privileges.map(privilege => {
                        if (update) {
                            return (<td><FormCheck defaultChecked={privilege}/></td>);
                        }
                        return (privilege ? <td>x</td> : <td></td>);
                    })}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default PrivilegesTable;
import Table from "react-bootstrap/Table";

function RolesTable({projects, update}) {
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
                <tr key={project.name}>
                    <td key={project.name+' '+projects.length}>{projectIndex+1}</td>
                    <td key={project.name+'-'+projects.length}>{project.name}</td>
                    {project.roles.map((role, roleIndex) => {
                        if (update) {
                            return (<td key={project.name+'-'+roleIndex}><input type="checkbox" className="custom-checkbox-input" defaultChecked={role}/></td>);
                        }
                        return (role ? <td key={project.name+'-'+roleIndex}>x</td> : <td key={project.name+'-'+roleIndex}></td>);
                    })}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default RolesTable;
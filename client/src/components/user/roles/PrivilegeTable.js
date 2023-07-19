import Table from "react-bootstrap/Table";

function PrivilegeTable({projects, userProjects, update}) {
    return (
        <Table className="m-1">
            <thead className="border-black">
            <tr>
                <th>#</th>
                <th>Nazwa projektu</th>
                <th>Dodanie pomiaru</th>
                <th>Klonowanie</th>
                <th>Usuwanie</th>
            </tr>
            </thead>
            <tbody>
            {
                userProjects.map((project, projectIndex) => (
                    <tr key={project.name}>
                        <td key={project.name + ' ' + projects.length}>{projectIndex + 1}</td>
                        <td key={project.name + '-' + projects.length}>{project.name}</td>
                        {project.privileges.map((privilege, privilegeIndex) => {
                            if (update) {
                                return (<td key={project.name + '-' + privilegeIndex}><input
                                    type="checkbox" className="custom-checkbox-input"
                                    defaultChecked={privilege}/></td>);
                            }
                            return (privilege ?
                                <td key={project.name + '-' + privilegeIndex}>x</td> :
                                <td key={project.name + '-' + privilegeIndex}></td>);
                        })}
                    </tr>))}
            </tbody>
        </Table>
    );
}

export default PrivilegeTable;
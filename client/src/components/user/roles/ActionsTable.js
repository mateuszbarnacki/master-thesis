import Table from "react-bootstrap/Table";

function ActionsTable({projects, userProjects, update}) {
    return (
        <Table className="m-1">
            <thead className="border-black">
            <tr>
                <th>#</th>
                <th>Nazwa projektu</th>
                <th>Dodanie pomiaru</th>
                <th>Klonowanie projektu</th>
            </tr>
            </thead>
            <tbody>
            {
                userProjects.map((project, projectIndex) => (
                    <tr key={project.name}>
                        <td key={project.name + ' ' + projects.length}>{projectIndex + 1}</td>
                        <td key={project.name + '-' + projects.length}>{project.name}</td>
                        {project.actions.map((action, actionIndex) => {
                            if (update) {
                                return (<td key={project.name + '-' + actionIndex}><input
                                    type="checkbox" className="custom-checkbox-input"
                                    defaultChecked={action}/></td>);
                            }
                            return (action ?
                                <td key={project.name + '-' + actionIndex}>x</td> :
                                <td key={project.name + '-' + actionIndex}></td>);
                        })}
                    </tr>))}
            </tbody>
        </Table>
    );
}

export default ActionsTable;
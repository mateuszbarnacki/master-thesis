import Col from "react-bootstrap/Col";

function ProjectInfoColumn({projectInfoCard, projectStructureCard}) {
    return (
        <Col xs={8} className="project-column">
            {projectInfoCard}
            {projectStructureCard}
        </Col>
    );
}

export default ProjectInfoColumn;
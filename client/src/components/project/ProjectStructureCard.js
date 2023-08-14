import Card from "react-bootstrap/Card";
import SyntaxHighlighter from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/src/styles/hljs/vs";

function ProjectStructureCard({project}) {
    return (
        <Card body className="project-structure m-3">
            <SyntaxHighlighter
                language="json"
                style={vs}
                wrapLines={true}
                showLineNumbers={true}>
                {JSON.stringify(project, null, 2)}
            </SyntaxHighlighter>
        </Card>);
}

export default ProjectStructureCard;
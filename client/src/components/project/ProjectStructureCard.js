import Card from "react-bootstrap/Card";
import SyntaxHighlighter from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/src/styles/hljs/vs";

function ProjectStructureCard({item}) {
    return (<Card body className="project-structure m-3">
        <SyntaxHighlighter
            language="json"
            style={vs}
            wrapLines={true}
            showLineNumbers={true}>
            {JSON.stringify(item, null, 2)}
        </SyntaxHighlighter>
    </Card>);
}

export default ProjectStructureCard;
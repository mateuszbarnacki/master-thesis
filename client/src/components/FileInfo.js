import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import CloseButton from "react-bootstrap/CloseButton";

function FileInfo({file, changeFile}) {
    return (
        <div className="text-center m-1">
            <i className="fa-2xl">
                <FontAwesomeIcon icon={faFileCsv}/>
            </i>
            &nbsp;{file.name}
            <CloseButton className="float-end" onClick={() => changeFile(null)}/>
        </div>
    );
}

export default FileInfo;
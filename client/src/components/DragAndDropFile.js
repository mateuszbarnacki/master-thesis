import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";

function DragAndDropFile({changeFile}) {
    const htmlRef = useRef(null);
    const handleDragOver = (event) => {
        event.preventDefault();
        htmlRef.current.classList.add('dragover');
    };
    const handleFileDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item) => {
                if (item.kind === "file" && item.type === "text/csv") {
                    const file = item.getAsFile();
                    changeFile(file);
                }
            });
        }
        htmlRef.current.classList.remove('dragover');
    };
    const handleOnFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "text/csv") {
            changeFile(file);
        }
    };

    return (
        <div className="text-center mt-4">
            <label htmlFor="file-input" onDragOver={handleDragOver} onDrop={handleFileDrop}>
                <div ref={htmlRef} className="file-uploader-area">
                    <i className="fa-3x">
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                    </i><br/>
                    <h6>Upuść plik lub wyszukaj na dysku</h6>
                </div>
            </label>
            <input id="file-input" type="file" accept=".csv" className="file-uploader"
                   onDrop={handleOnFileInputChange} onChange={handleOnFileInputChange}/>
        </div>
    );
}

export default DragAndDropFile;
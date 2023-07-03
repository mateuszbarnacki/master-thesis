import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

function DragAndDropFile({changeFile}) {
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleFileDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    changeFile(file);
                }
            });
        }
    };
    const handleOnFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            changeFile(file);
        }
    };

    return (
        <div className="text-center mt-4">
            <label htmlFor="file-input" onDragOver={handleDragOver} onDrop={handleFileDrop}>
                <div className="file-uploader-area">
                    <i className="fa-3x">
                        <FontAwesomeIcon icon={faCloudArrowUp}/>
                    </i><br/>
                    <h6>Przeciągnij plik lub wyszukaj na dysku</h6>
                </div>
            </label>
            <input id="file-input" type="file" accept=".csv" className="file-uploader"
                   onDrop={handleOnFileInputChange} onChange={handleOnFileInputChange}/>
        </div>
    );
}

export default DragAndDropFile;
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import {useState} from "react";
import {isStringNullOrEmpty} from "./FormValidator";

function ParameterForm({
                           id,
                           sensorId,
                           measurement,
                           handleAddMeasurementClick,
                           handleRemoveMeasurementClick,
                           isAddMeasurementButtonVisible
                       }) {
    const [isMeasurementNameInvalid, setIsMeasurementNameInvalid] = useState(false);
    const [isMaxBreakInvalid, setIsMaxBreakInvalid] = useState(false);
    const [isErrorValueInvalid, setIsErrorValueInvalid] = useState(false);
    const [isValueRangeInvalid, setIsValuesRangeInvalid] = useState(false);
    const handleOnChangeMeasurementName = () => {
        const measurementName = document.getElementById("measurementName-"+sensorId+"-"+id).value;
        setIsMeasurementNameInvalid(isStringNullOrEmpty(measurementName));
    };
    const handleOnChangeAggregate = () => {
        const aggregate = document.getElementById("aggregate-"+sensorId+"-"+id).value;
        if (aggregate === "tak") {
            document.getElementById("aggregationInterval-"+sensorId+"-"+id).disabled = false;
            document.getElementById("maxBreak-"+sensorId+"-"+id).disabled = false;
        } else {
            setIsMaxBreakInvalid(false);
            document.getElementById("aggregationInterval-"+sensorId+"-"+id).disabled = true;
            document.getElementById("maxBreak-"+sensorId+"-"+id).disabled = true;
        }
    };
    const handleOnChangeMaxBreak = () => {
        const maxBreak = document.getElementById("maxBreak-"+sensorId+"-"+id).value;
        setIsMaxBreakInvalid((!maxBreak || maxBreak <= 0));
    };
    const handleOnChangeValidate = () => {
        const validate = document.getElementById("validate-"+sensorId+"-"+id).value;
        if (validate === "tak") {
            setIsValuesRangeInvalid(checkValuesRange());
            document.getElementById("minValue-"+sensorId+"-"+id).disabled = false;
            document.getElementById("maxValue-"+sensorId+"-"+id).disabled = false;
        } else {
            setIsValuesRangeInvalid(false);
            document.getElementById("minValue-"+sensorId+"-"+id).disabled = true;
            document.getElementById("maxValue-"+sensorId+"-"+id).disabled = true;
        }
    };
    const handleOnChangeValuesRange = () => {
        setIsValuesRangeInvalid(checkValuesRange());
    };
    const handleOnInputErrorValue = () => {
        const errorValue = document.getElementById("errorValue-"+sensorId+"-"+id).value;
        setIsErrorValueInvalid(!errorValue);
    };
    const checkValuesRange = () => {
        const minValue = document.getElementById("minValue-"+sensorId+"-"+id).value;
        const maxValue = document.getElementById("maxValue-"+sensorId+"-"+id).value;
        return !minValue || !maxValue || maxValue - minValue < 0;
    };

    return (
        <div id={"measurement-" + sensorId + "-" + id} className="bg-light-subtle">
            <FormLabel as="h4" className="m-1">
                Parametr #{id + 1}
                <CloseButton className="float-end" onClick={handleRemoveMeasurementClick}/>
            </FormLabel>
            <FormGroup className="mt-3">
                <FormLabel htmlFor={"measurementName-"+sensorId+"-"+id}>
                    Nazwa pomiaru:
                </FormLabel>
                <FormControl id={"measurementName-"+sensorId+"-"+id}
                             type="text"
                             onChange={handleOnChangeMeasurementName}
                             isInvalid={isMeasurementNameInvalid}
                             defaultValue={measurement ? measurement.name : null}
                             placeholder="Nazwa pomiaru"
                             required/>
                <FormControl.Feedback type="invalid">
                    Proszę podać nazwę pomiaru
                </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel htmlFor={"measurementUnit-"+sensorId+"-"+id}>
                    Jednostka pomiaru:
                </FormLabel>
                <FormControl id={"measurementUnit-"+sensorId+"-"+id}
                             type="text"
                             placeholder="Jednostka pomiaru"
                             defaultValue={measurement ? measurement.unit : null}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel htmlFor={"measurementDescription-"+sensorId+"-"+id}>
                    Opis pomiaru:
                </FormLabel>
                <FormControl id={"measurementDescription-"+sensorId+"-"+id}
                             type="text"
                             as="textarea"
                             rows={3}
                             placeholder="Opis pomiaru"
                             defaultValue={measurement ? measurement.description : null}/>
            </FormGroup>
            <Row xs={3}>
                <FormGroup className="mt-3">
                    <FormLabel htmlFor={"aggregate-"+sensorId+"-"+id}>
                        Agregacja:
                    </FormLabel>
                    <FormSelect id={"aggregate-"+sensorId+"-"+id}
                                onChange={handleOnChangeAggregate}
                                defaultValue={measurement ? measurement.aggregate : null}>
                        <option value="true">tak</option>
                        <option value="false">nie</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mt-3">
                    <FormLabel htmlFor={"aggregationInterval-"+sensorId+"-"+id}>
                        Jednostka częstości pomiaru:
                    </FormLabel>
                    <FormSelect id={"aggregationInterval-"+sensorId+"-"+id}
                                defaultValue={measurement ? measurement.aggregationInterval : null}>
                        <option value="MIN">minuta</option>
                        <option value="TEN_MIN">10 minut</option>
                        <option value="HOUR">godzina</option>
                        <option value="DAY">dzień</option>
                        <option value="WEEK">tydzień</option>
                        <option value="MONTH">miesiąc</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mt-3">
                    <FormLabel htmlFor={"maxBreak-"+sensorId+"-"+id}>
                        Maksymalna przerwa w pomiarach:
                    </FormLabel>
                    <FormControl id={"maxBreak-"+sensorId+"-"+id}
                                 type="number"
                                 isInvalid={isMaxBreakInvalid}
                                 onChange={handleOnChangeMaxBreak}
                                 placeholder="sekundy"
                                 defaultValue={measurement ? measurement.maxBreak : null}/>
                    <FormControl.Feedback type="invalid">
                        Wartość musi być większa od 0
                    </FormControl.Feedback>
                </FormGroup>
            </Row>
            <Row xs={4}>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor={"validate-"+sensorId+"-"+id}>
                        Walidacja:
                    </FormLabel>
                    <FormSelect id={"validate-"+sensorId+"-"+id} onChange={handleOnChangeValidate}
                                defaultValue={measurement ? measurement.validate : null}>
                        <option value="true">tak</option>
                        <option value="false">nie</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor={"minValue-"+sensorId+"-"+id}>
                        Minimalna wartość:
                    </FormLabel>
                    <FormControl id={"minValue-"+sensorId+"-"+id}
                                 type="number"
                                 onChange={handleOnChangeValuesRange}
                                 isInvalid={isValueRangeInvalid}
                                 placeholder="Minimalna wartość"
                                 defaultValue={measurement.range ? measurement.range.min : null}/>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor={"maxValue-"+sensorId+"-"+id}>
                        Maksymalna wartość:
                    </FormLabel>
                    <FormControl id={"maxValue-"+sensorId+"-"+id}
                                 type="number"
                                 onChange={handleOnChangeValuesRange}
                                 isInvalid={isValueRangeInvalid}
                                 placeholder="Maksymalna wartość"
                                 defaultValue={measurement.range ? measurement.range.max : null}/>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor={"errorValue-"+sensorId+"-"+id}>
                        Wartość błędu:
                    </FormLabel>
                    <FormControl id={"errorValue-"+sensorId+"-"+id}
                                 type="number"
                                 onInput={handleOnInputErrorValue}
                                 isInvalid={isErrorValueInvalid}
                                 placeholder="Wartość błędu"
                                 defaultValue={measurement ? measurement.errorValue : null}/>
                    <FormControl.Feedback type="invalid">
                        Podaj wartość błędu
                    </FormControl.Feedback>
                </FormGroup>
            </Row>
            <div style={isAddMeasurementButtonVisible ? {} : {display: "none"}}>
                <Button variant="outline-dark" className="ms-2 me-2 rounded-5 float-end"
                        onClick={handleAddMeasurementClick}>+</Button>
                <h5 className="float-end mt-2">Dodaj parametr</h5>
            </div>
        </div>
    );
}

export default ParameterForm;
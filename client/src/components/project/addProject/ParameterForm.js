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
        const measurementName = document.getElementById("measurementName").value;
        setIsMeasurementNameInvalid(isStringNullOrEmpty(measurementName));
    };
    const handleOnChangeAggregate = () => {
        const aggregate = document.getElementById("aggregate").value;
        if (aggregate === "tak") {
            document.getElementById("aggregationInterval").disabled = false;
            document.getElementById("maxBreak").disabled = false;
        } else {
            setIsMaxBreakInvalid(false);
            document.getElementById("aggregationInterval").disabled = true;
            document.getElementById("maxBreak").disabled = true;
        }
    };
    const handleOnChangeMaxBreak = () => {
        const maxBreak = document.getElementById("maxBreak").value;
        setIsMaxBreakInvalid((!maxBreak || maxBreak <= 0));
    };
    const handleOnChangeValidate = () => {
        const validate = document.getElementById("validate").value;
        if (validate === "tak") {
            setIsValuesRangeInvalid(checkValuesRange());
            document.getElementById("minValue").disabled = false;
            document.getElementById("maxValue").disabled = false;
        } else {
            setIsValuesRangeInvalid(false);
            document.getElementById("minValue").disabled = true;
            document.getElementById("maxValue").disabled = true;
        }
    };
    const handleOnChangeValuesRange = () => {
        setIsValuesRangeInvalid(checkValuesRange());
    };
    const handleOnInputErrorValue = () => {
        const errorValue = document.getElementById("errorValue").value;
        setIsErrorValueInvalid(!errorValue);
    };
    const checkValuesRange = () => {
        const minValue = document.getElementById("minValue").value;
        const maxValue = document.getElementById("maxValue").value;
        return !minValue || !maxValue || maxValue - minValue < 0;
    };

    return (
        <div className="bg-light-subtle">
            <FormLabel as="h4" className="m-1">
                Parametr #{id + 1}
                <CloseButton className="float-end" onClick={handleRemoveMeasurementClick}/>
            </FormLabel>
            <FormGroup className="mt-3">
                <FormLabel htmlFor="measurementName">
                    Nazwa pomiaru:
                </FormLabel>
                <FormControl id="measurementName"
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
                <FormLabel htmlFor="measurementUnit">
                    Jednostka pomiaru:
                </FormLabel>
                <FormControl id="measurementUnit"
                             type="text"
                             placeholder="Jednostka pomiaru"
                             defaultValue={measurement ? measurement.unit : null}/>
            </FormGroup>
            <FormGroup className="mt-3">
                <FormLabel htmlFor="measurementDescription">
                    Opis pomiaru:
                </FormLabel>
                <FormControl id="measurementDescription"
                             type="text"
                             as="textarea"
                             rows={3}
                             placeholder="Opis pomiaru"
                             defaultValue={measurement ? measurement.description : null}/>
            </FormGroup>
            <Row xs={3}>
                <FormGroup className="mt-3">
                    <FormLabel htmlFor="aggregate">
                        Agregacja:
                    </FormLabel>
                    <FormSelect id="aggregate" onChange={handleOnChangeAggregate}
                                defaultValue={measurement ? measurement.aggregate : null}>
                        <option value="true">tak</option>
                        <option value="false">nie</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mt-3">
                    <FormLabel htmlFor="aggregationInterval">
                        Jednostka częstości pomiaru:
                    </FormLabel>
                    <FormSelect id="aggregationInterval"
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
                    <FormLabel htmlFor="maxBreak">
                        Maksymalna przerwa w pomiarach:
                    </FormLabel>
                    <FormControl id="maxBreak"
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
                    <FormLabel htmlFor="validate">
                        Walidacja:
                    </FormLabel>
                    <FormSelect id="validate" onChange={handleOnChangeValidate}
                                defaultValue={measurement ? measurement.validate : null}>
                        <option value="true">tak</option>
                        <option value="false">nie</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor="minValue">
                        Minimalna wartość:
                    </FormLabel>
                    <FormControl id="minValue"
                                 type="number"
                                 onChange={handleOnChangeValuesRange}
                                 isInvalid={isValueRangeInvalid}
                                 placeholder="Minimalna wartość"
                                 defaultValue={measurement.range ? measurement.range.min : null}/>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor="maxValue">
                        Maksymalna wartość:
                    </FormLabel>
                    <FormControl id="maxValue"
                                 type="number"
                                 onChange={handleOnChangeValuesRange}
                                 isInvalid={isValueRangeInvalid}
                                 placeholder="Maksymalna wartość"
                                 defaultValue={measurement.range ? measurement.range.max : null}/>
                </FormGroup>
                <FormGroup className="mt-3 mb-3">
                    <FormLabel htmlFor="errorValue">
                        Wartość błędu:
                    </FormLabel>
                    <FormControl id="errorValue"
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
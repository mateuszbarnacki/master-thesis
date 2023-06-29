import Button from "react-bootstrap/Button";
import CardHeader from "react-bootstrap/CardHeader";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import {useState} from "react";
import {isStringNullOrEmpty} from "./FormValidator";

function MeasurementForm() {
    const [isMeasurementNameInvalid, setIsMeasurementNameInvalid] = useState(false);
    const [isMaxBreakInvalid, setIsMaxBreakInvalid] = useState(false);
    const [isErrorValueInvalid, setIsErrorValueInvalid] = useState(false);
    const [isValueRangeInvalid, setIsValuesRangeInvalid] = useState(false);
    const handleOnChangeMeasurementName = (event) => {
        const measurementName = document.getElementById("measurementName").value;
        setIsMeasurementNameInvalid(isStringNullOrEmpty(measurementName));
    };
    const handleOnChangeAggregate = (event) => {
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
    const handleOnChangeMaxBreak = (event) => {
        const maxBreak = document.getElementById("maxBreak").value;
        setIsMaxBreakInvalid((!maxBreak || maxBreak <= 0));
    };
    const handleOnChangeValidate = (event) => {
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
    const handleOnChangeValuesRange = (event) => {
        setIsValuesRangeInvalid(checkValuesRange());
    };
    const handleOnInputErrorValue = (event) => {
        const errorValue = document.getElementById("errorValue").value;
        setIsErrorValueInvalid(!errorValue);
    };
    const checkValuesRange = () => {
        const minValue = document.getElementById("minValue").value;
        const maxValue = document.getElementById("maxValue").value;
        return !minValue || !maxValue || maxValue - minValue < 0;
    };

    return (
        <Card className="border-black m-3 bg-light-subtle">
            <CardHeader>
                Etap 3. Uzupełnij informacje o parametrach pomiarowych tego czujnika
            </CardHeader>
            <Card.Body>
                <div className="bg-light-subtle">
                    <FormLabel as="h4" className="m-1">
                        Parametr
                        <CloseButton className="float-end"/>
                    </FormLabel>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="measurementName">
                            Nazwa pomiaru:
                        </FormLabel>
                        <FormControl id="measurementName"
                                     type="text"
                                     onChange={handleOnChangeMeasurementName}
                                     isInvalid={isMeasurementNameInvalid}
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
                                     placeholder="Jednostka pomiaru"/>
                    </FormGroup>
                    <FormGroup className="mt-3">
                        <FormLabel htmlFor="measurementDescription">
                            Opis pomiaru:
                        </FormLabel>
                        <FormControl id="measurementDescription"
                                     type="text"
                                     as="textarea"
                                     rows={3}
                                     placeholder="Opis pomiaru"/>
                    </FormGroup>
                    <Row xs={3}>
                        <FormGroup className="mt-3">
                            <FormLabel htmlFor="aggregate">
                                Agregacja:
                            </FormLabel>
                            <FormSelect id="aggregate" onChange={handleOnChangeAggregate}>
                                <option>tak</option>
                                <option>nie</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mt-3">
                            <FormLabel htmlFor="aggregationInterval">
                                Jednostka częstości pomiaru:
                            </FormLabel>
                            <FormSelect id="aggregationInterval">
                                <option>minuta</option>
                                <option>10 minut</option>
                                <option>godzina</option>
                                <option>dzień</option>
                                <option>tydzień</option>
                                <option>miesiąc</option>
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
                                         placeholder="sekundy"/>
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
                            <FormSelect id="validate" onChange={handleOnChangeValidate}>
                                <option>tak</option>
                                <option>nie</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="minValue">
                                Minimalna poprawna wartość:
                            </FormLabel>
                            <FormControl id="minValue"
                                         type="number"
                                         onChange={handleOnChangeValuesRange}
                                         isInvalid={isValueRangeInvalid}
                                         placeholder="Minimalna wartość"/>
                        </FormGroup>
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="maxValue">
                                Maksymalna poprawna wartość:
                            </FormLabel>
                            <FormControl id="maxValue"
                                         type="number"
                                         onChange={handleOnChangeValuesRange}
                                         isInvalid={isValueRangeInvalid}
                                         placeholder="Maksymalna wartość"/>
                        </FormGroup>
                        <FormGroup className="mt-3 mb-3">
                            <FormLabel htmlFor="errorValue">
                                Wartość błędu:
                            </FormLabel>
                            <FormControl id="errorValue"
                                         type="number"
                                         onInput={handleOnInputErrorValue}
                                         isInvalid={isErrorValueInvalid}
                                         placeholder="Wartość błędu"/>
                            <FormControl.Feedback type="invalid">
                                Podaj wartość błędu
                            </FormControl.Feedback>
                        </FormGroup>
                    </Row>
                </div>
                <Button variant="outline-dark" className="ms-2 me-2 rounded-5 float-end">+</Button>
                <div className="float-end mt-2"><h5>Dodaj parametr</h5></div>
            </Card.Body>
        </Card>
    );
}

export default MeasurementForm;
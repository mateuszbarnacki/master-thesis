export function isStringNullOrEmpty(text) {
    return !text || text.length === 0 || !text.trim();
}

export function isNumberOutOfRange(value, minValue, maxValue) {
    return (value < minValue || value > maxValue);
}

export function validateProject(projectDto) {
    const errors = [];
    if (projectDto.measurementMode === 'SINGLE' && projectDto.sensors.length > 1) {
        errors.push('Projekt z typem pomiaru \'pojedynczy\' nie może zawierać więcej niż jednego czujnika');
    }
    errors.push(validateRequiredString('Nazwa projektu', projectDto.name).toString());
    errors.push(validateAcronym(projectDto.acronym).toString());
    errors.push(validateSensors(projectDto.sensors).toString());
    return errors.filter(item => !isStringNullOrEmpty(item));
}

function validateSensors(sensors) {
    const errors = [];
    for (const sensor of sensors) {
        errors.push(validateRequiredString('Identyfikator czujnika', sensor.deviceId).toString());
        errors.push(validateMeasurements(sensor.measurementSchema.measurements).toString());
    }
    return errors.filter(item => !isStringNullOrEmpty(item)).join('\n');
}

function validateMeasurements(measurements) {
    const errors = [];
    for (const measurement of measurements) {
        errors.push(validateRequiredString('Nazwa parametru', measurement.name).toString());
        errors.push(validateRequiredString('Jednostka', measurement.unit).toString());
        errors.push(validateRequiredNumber('Wartość błędu', measurement.errorValue).toString());
    }
    return errors.filter(item => !isStringNullOrEmpty(item)).join('\n');
}

function validateRequiredString(name, text) {
    const errors = [];
    if (isStringNullOrEmpty(text)) {
        errors.push(name + ' jest pusty');
    }
    return errors.filter(item => !isStringNullOrEmpty(item)).join('\n');
}

function validateRequiredNumber(name, number) {
    const errors = [];
    if (isNaN(parseFloat(number))) {
        errors.push(name + ' nie jest liczbą');
    }
    return errors.filter(item => !isStringNullOrEmpty(item)).join('\n');
}

function validateAcronym(acronym) {
    const errors = [];
    if (acronym.length > 10) {
        errors.push('Akronim ma więcej niż 10 znaków');
    }
    if (!/^([a-zA-Z0-9]|-)+$/.test(acronym)) {
        errors.push('Akronim zawiera nieodpowiedni znak');
    }
    if (/^\d$/.test(acronym[0])) {
        errors.push('Pierwszy znak akronimu nie może być cyfrą');
    }
    return errors.filter(item => !isStringNullOrEmpty(item)).join('\n');
}

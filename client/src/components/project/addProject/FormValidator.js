export function isStringNullOrEmpty(text) {
    return !text || text.length === 0 || !text.trim();
}

export function isNumberOutOfRange(value, minValue, maxValue) {
    return (value < minValue || value > maxValue);
}

export function validateAcronym(acronym) {
    const errors = [];
    if (acronym.length > 10) {
        errors.push('Akronim ma więcej niż 10 znaków!');
    }
    if (!/^([a-zA-Z0-9]|-)+$/.test(acronym)) {
        errors.push('Akronim zawiera nieodpowiedni znak!');
    }
    if (/^\d$/.test(acronym[0])) {
        errors.push('Pierwszy znak akronimu nie może być cyfrą!');
    }
    return errors;
}
export function isStringNullOrEmpty(text) {
    return !text || text.length === 0 || !text.trim();
}

export function isNumberOutOfRange(value, minValue, maxValue) {
    return (value < minValue || value > maxValue);
}
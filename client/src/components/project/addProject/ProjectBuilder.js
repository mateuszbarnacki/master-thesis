export function buildProject(size) {
    const name = document.getElementById('name').value;
    const acronym = document.getElementById('acronym').value;
    const description = document.getElementById('description').value;
    const timeMode = document.getElementById('timeMode').value;
    const spatialMode = document.getElementById('spatialMode').value;
    const measurementMode = document.getElementById('measurementMode').value;
    const sensors = [];
    for (let i = 0; i < size; i++) {
        const sensorId = document.getElementById('sensorId-' + i).value;
        const longitude = !!document.getElementById('longitude-' + i) ?
            document.getElementById('longitude-' + i).value : null;
        const latitude = !!document.getElementById('latitude-' + i) ?
            document.getElementById('latitude-' + i).value : null;
        const altitude = !!document.getElementById('altitude-' + i) ?
            document.getElementById('altitude-' + i).value : null;
        let j = 0;
        let measurement = document.getElementById('measurement-' + i + "-" + j);
        const measurements = [];
        while (measurement) {
            const measurementName = document.getElementById('measurementName-' + i + '-' + j).value;
            const measurementUnit = document.getElementById('measurementUnit-' + i + '-' + j).value;
            const measurementDescription = document.getElementById('measurementDescription-' + i + '-' + j).value;
            const aggregate = document.getElementById('aggregate-' + i + '-' + j).value;
            const aggregationInterval = document.getElementById('aggregationInterval-' + i + '-' + j).value;
            const maxBreak = document.getElementById('maxBreak-' + i + '-' + j).value;
            const validate = document.getElementById('validate-' + i + '-' + j).value;
            const minValue = document.getElementById('minValue-' + i + '-' + j).value;
            const maxValue = document.getElementById('maxValue-' + i + '-' + j).value;
            const range = {
                min: parseFloat(minValue),
                max: parseFloat(maxValue)
            };
            const errorValue = document.getElementById('errorValue-' + i + '-' + j).value;
            measurements.push({
                name: measurementName,
                description: measurementDescription,
                unit: measurementUnit,
                range: range,
                validate: (validate === 'true'),
                errorValue: parseInt(errorValue),
                aggregate: (aggregate === 'true'),
                aggregationInterval: aggregationInterval,
                maxBreak: parseInt(maxBreak)
            });
            measurement = document.getElementById('measurement-' + i + "-" + ++j);
        }
        sensors.push({
            deviceId: sensorId,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            altitude: parseFloat(altitude),
            measurementSchema: {
                measurements: measurements
            }
        });
    }
    const projectDto = {
        name: name,
        acronym: acronym,
        description: description,
        timeMode: timeMode,
        spatialMode: spatialMode,
        measurementMode: measurementMode,
        sensors: sensors
    };
    return projectDto;
}
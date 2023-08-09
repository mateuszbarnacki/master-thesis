module.exports.schema = {
    $jsonSchema: {
        title: 'Project Validation',
        bsonType: 'object',
        required: ['_id', 'name', 'acronym','timeMode', 'spatialMode', 'measurementMode', 'sensors'],
        properties: {
            _id: {
                bsonType: 'objectId'
            },
            name: {
                bsonType: 'string',
                description: 'Project name'
            },
            acronym: {
                bsonType: 'string',
                description: 'Project code which is used to fetch data'
            },
            description: {
                bsonType: 'string',
                description: 'Project description'
            },
            timeMode: {
                bsonType: 'string',
                enum: ['PERMANENTLY', 'TEMPORARY', 'OFFLINE'],
                description: 'Time mode value defines how measurements are added'
            },
            spatialMode: {
                bsonType: 'string',
                enum: ['STATIONARY', 'MOBILE_2D', 'MOBILE_3D'],
                description: 'Spatial mode value describes sensor type'
            },
            measurementMode: {
                bsonType: 'string',
                enum: ['SINGLE', 'NETWORK'],
                description: 'Measurement mode value defines whether measurements are send by single sensor or group of sensors'
            },
            sensors: {
                bsonType: 'array',
                required: ['deviceId', 'measurementSchema'],
                items: {
                    bsonType: 'object',
                    properties: {
                        deviceId: {
                            bsonType: 'string',
                            description: 'Sensor identifier'
                        },
                        latitude: {
                            bsonType: ['double', 'null']
                        },
                        longitude: {
                            bsonType: ['double', 'null']
                        },
                        altitude: {
                            bsonType: ['double', 'null']
                        },
                        measurementSchema: {
                            bsonType: 'object',
                            required: ['measurements'],
                            properties: {
                                measurements: {
                                    bsonType: 'array',
                                    required: ['name', 'unit', 'range', 'validate', 'errorValue', 'aggregate', 'aggregationInterval', 'maxBreak'],
                                    items: {
                                        bsonType: 'object',
                                        properties: {
                                            name: {
                                                bsonType: 'string',
                                                description: 'Parameter name'
                                            },
                                            description: {
                                                bsonType: 'string',
                                                description: 'Parameter description'
                                            },
                                            unit: {
                                                bsonType: 'string',
                                                description: 'Parameter unit'
                                            },
                                            range: {
                                                bsonType: 'object',
                                                required: ['min', 'max'],
                                                properties: {
                                                    min: {
                                                        bsonType: ['double', 'null'],
                                                        description: 'Minimal parameter value'
                                                    },
                                                    max: {
                                                        bsonType: ['double', 'null'],
                                                        description: 'Maximal parameter value'
                                                    }
                                                },
                                                additionalProperties: false
                                            },
                                            validate: {
                                                bsonType: 'bool',
                                                description: 'Flag which determines whether validate parameter or not'
                                            },
                                            errorValue: {
                                                bsonType: 'int',
                                                description: 'Value which is used to inform that something goes wrong'
                                            },
                                            aggregate: {
                                                bsonType: 'bool',
                                                description: 'Flag which determines whether aggregate measurements or not'
                                            },
                                            aggregationInterval: {
                                                bsonType: 'string',
                                                enum: ['MIN', 'TEN_MIN', 'HOUR', 'DAY', 'WEEK', 'MONTH'],
                                                description: 'Intervals between subsequent aggregations'
                                            },
                                            maxBreak: {
                                                bsonType: ['int', 'null'],
                                                description: 'Max break between subsequent measurements send by sensor'
                                            }
                                        },
                                        additionalProperties: false
                                    }
                                }
                            },
                            additionalProperties: false
                        }
                    },
                    additionalProperties: false
                }
            }
        },
        additionalProperties: false
    }
};
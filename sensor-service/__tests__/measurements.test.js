const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const MeasurementService = require('../src/service/MeasurementService');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Measurements tests', () => {
    describe('Measurements GET tests', () => {
        beforeAll(() => {
            jest.spyOn(MeasurementService.prototype, 'getMeasurements')
                .mockImplementation((acronym) => {
                    return {
                        data: [{temperature: 12}, {temperature: -5}],
                        statusCode: 200
                    }
                });
            jest.spyOn(MeasurementService.prototype, 'getLatestMeasurements')
                .mockImplementation((acronym) => {
                    return {
                        data: [{temperature: 0}, {temperature: 15}, {temperature: 33}],
                        statusCode: 200
                    }
                });
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should return list of all measurements in given project', done => {
            const acronym = 'test';

            chai.request(app)
                .get(`/measurements/${acronym}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(2);
                    expect(res.body[1]).to.have.deep.property('temperature', -5);
                    done();
                });
        });

        it('should return latest measurements', done => {
            const acronym = 'test2';

            chai.request(app)
                .get(`/measurements/${acronym}/latest`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.equal(3);
                    expect(res.body[2]).to.have.deep.property('temperature', 33);
                    done();
                });
        });
    });

    describe('Measurements POST tests', () => {
        beforeAll(() => {
            jest.spyOn(MeasurementService.prototype, 'addMeasurement')
                .mockImplementation((apiKey, acronym, deviceId, measurement) => {
                    return {
                        data: [measurement],
                        statusCode: 201
                    }});
            jest.spyOn(MeasurementService.prototype, 'addMeasurementsFromFile')
                .mockImplementation((acronym, deviceId, stream) => {
                    return {
                        data: [],
                        statusCode: 201
                    }});
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should add measurement', done => {
            const acronym = 'test';
            const deviceId = '1';
            const measurement = {temperature: 13};

            chai.request(app)
                .post(`/measurements/${acronym}/${deviceId}`)
                .set('Content-Type', 'application/json')
                .set('X-API-Key', 'test.1234')
                .send(measurement)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body[0]).to.have.deep.property('temperature', 13);
                    done();
                });
        });

        it('sould add measurement from file', done => {
            const acronym = 'test';
            const deviceId = '2';

            chai.request(app)
                .post(`/measurements/upload/${acronym}/${deviceId}`)
                .set('Content-Type', 'multipart/form-data')
                .field('file', 'test.csv')
                .attach('file', './__tests__/resource/test.csv')
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });
    });
});
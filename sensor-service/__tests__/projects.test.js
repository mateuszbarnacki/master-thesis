const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const ProjectService = require('../src/service/ProjectService');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Projects tests', () => {
    describe('Projects GET tests', () => {

        beforeAll(() => {
            jest.spyOn(ProjectService.prototype, 'getProjectsNames')
                .mockImplementation(() => ['test1', 'test2']);
            jest.spyOn(ProjectService.prototype, 'getProjectByAcronym')
                .mockImplementation((acronym) => {
                    return {
                        _id: 1,
                        name: 'Test Project',
                        acronym: 'test'
                    };
                });
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should return a list of projects', done => {
            const expected = ['test1', 'test2'];

            chai.request(app)
                .get('/projects/names')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(expected);
                    done();
                });
        });

        it('should return project by acronym', done => {
            const acronym = 'test';

            chai.request(app)
                .get(`/projects?acronym=${acronym}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.deep.equal('Test Project');
                    expect(res.body.acronym).to.deep.equal(acronym);
                    done();
                });
        });
    });

    describe('Projects POST test', () => {

        beforeAll(() => {
            jest.spyOn(ProjectService.prototype, 'addProject')
                .mockImplementation((project) => {
                    return {_id: '1234'};
                });
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should add project', done => {
            const project = {
                name: 'test',
                acronym: 'test1234'
            };

            chai.request(app)
                .post('/projects/')
                .set('content-type', 'application/json')
                .send(project)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body._id).to.deep.equal('1234');
                    done();
                });
        });
    });

    describe('Projects DELETE test', () => {

        beforeAll(() => {
            jest.spyOn(ProjectService.prototype, 'deleteProject')
                .mockImplementation((acronym) => {
                    return {};
                });
        });
        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should delete project', done => {
            const acronym = 'test1234';

            chai.request(app)
                .delete(`/projects/${acronym}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });
});
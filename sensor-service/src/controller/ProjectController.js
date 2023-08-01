const express = require('express');
const DbManager = require('../db/DbManager');
const ProjectService = require('../service/ProjectService');

const projectService = new ProjectService(new DbManager(process.env.DATABASE_URL));

class ProjectController {
    constructor() {
        this.router = express.Router();
        this.#initializeRoutes()
    }

    #initializeRoutes() {
        this.router.get('/names', this.getProjectsNames);
        this.router.get('/single/:acronym', this.getProject);
        this.router.post('/', this.addProject);
        this.router.delete('/:acronym', this.deleteProject);
    }

    async getProject(req, res) {
        try {
            const acronym = req.params.acronym;
            const result = await projectService.getProject(acronym);
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async getProjectsNames(req, res) {
        try {
            const projectNames = await projectService.getProjectsNames();
            return res.status(200).send(projectNames);
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }

    async addProject(req, res) {
        try {
            const project = req.body;
            const newProject = await projectService.addProject(project);
            return res.status(201).json(newProject);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async deleteProject(req, res) {
        try {
            const acronym = req.params.acronym;
            const result = await projectService.deleteProject(acronym);
            return res.status(204).json(result);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new ProjectController();
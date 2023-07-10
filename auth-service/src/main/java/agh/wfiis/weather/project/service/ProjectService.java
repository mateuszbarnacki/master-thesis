package agh.wfiis.weather.project.service;

import agh.wfiis.weather.project.dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    /**
     * This method is used to get all project from database.
     *
     * @return List which contains all projects.
     */
    List<ProjectDto> getProjects();

    /**
     * This method is used to add new project.
     *
     * @param projectDto Object which contains project name.
     */
    void addProject(ProjectDto projectDto);
}

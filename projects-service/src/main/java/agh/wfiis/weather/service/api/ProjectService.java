package agh.wfiis.weather.service.api;

import agh.wfiis.weather.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

    ProjectDto getProject(String name);

    List<ProjectDto> getProjects();

    ProjectDto addProject(ProjectDto projectDto);

    void deleteProject(String name);

}

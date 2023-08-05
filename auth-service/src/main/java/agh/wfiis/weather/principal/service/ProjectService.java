package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.principal.dto.ProjectActionsDto;

public interface ProjectService {
    /**
     * This method updates actions for project with given id.
     *
     * @param projectActionsDto Object which contains new data.
     * @return ProjectActionsDto Object with updated data.
     */
    ProjectActionsDto updateActions(ProjectActionsDto projectActionsDto);
}

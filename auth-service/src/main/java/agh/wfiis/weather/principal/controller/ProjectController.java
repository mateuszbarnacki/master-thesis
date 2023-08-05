package agh.wfiis.weather.principal.controller;

import agh.wfiis.weather.principal.dto.ProjectActionsDto;
import agh.wfiis.weather.principal.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PatchMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ProjectActionsDto updateActions(@Valid @RequestBody ProjectActionsDto projectActionsDto) {
        return projectService.updateActions(projectActionsDto);
    }
}

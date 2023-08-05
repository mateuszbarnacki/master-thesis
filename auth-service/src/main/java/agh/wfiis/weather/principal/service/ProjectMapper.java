package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.exception.ActionNotFoundException;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class ProjectMapper {
    private final ActionRepository actionRepository;
    private final Map<String, ProjectAction> stringToProjectAction = Map.of(
            ProjectAction.ADD_MEASUREMENT.getAction(), ProjectAction.ADD_MEASUREMENT,
            ProjectAction.CLONE_PROJECT.getAction(), ProjectAction.CLONE_PROJECT);

    ProjectMapper(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    Set<ProjectDto> mapProjectEntitiesToProjectDtos(Set<ProjectEntity> entities) {
        return entities.stream()
                .map(this::mapProjectEntityToProjectDto)
                .collect(Collectors.toSet());
    }

    Set<ProjectEntity> mapProjectDtosToEntities(Set<ProjectDto> dtos) {
        return dtos.stream()
                .map(this::mapProjectDtoToProjectEntity)
                .collect(Collectors.toSet());
    }

    Set<ProjectEntity> mapProjectNamesToEntities(Set<String> projects) {
        return projects.stream()
                .map(this::mapProjectNameToProjectEntity)
                .collect(Collectors.toSet());
    }

    private ProjectDto mapProjectEntityToProjectDto(ProjectEntity entity) {
        return new ProjectDto(
                entity.getId(),
                entity.getName(),
                mapEntitiesToEnums(entity.getActions()));
    }

    private ProjectEntity mapProjectDtoToProjectEntity(ProjectDto dto) {
        ProjectEntity entity = new ProjectEntity();

        entity.setName(dto.name());
        entity.addActions(mapEnumsToEntities(dto.actions()));

        return entity;
    }

    private ProjectEntity mapProjectNameToProjectEntity(String projectName) {
        ProjectEntity entity = new ProjectEntity();

        entity.setName(projectName);
        entity.addActions(Collections.emptySet());

        return entity;
    }

    private Set<ProjectAction> mapEntitiesToEnums(Set<ActionEntity> actionEntities) {
        return actionEntities.stream()
                .map(action -> stringToProjectAction.get(action.getName()))
                .collect(Collectors.toSet());
    }

    private Set<ActionEntity> mapEnumsToEntities(Set<ProjectAction> actions) {
        Set<ActionEntity> actionEntities = new HashSet<>();
        actions.forEach(projectAction -> actionEntities.add(getActionEntity(projectAction.getAction())));
        return actionEntities;
    }

    private ActionEntity getActionEntity(String actionName) {
        return actionRepository.findActionEntityByName(actionName)
                .orElseThrow(() -> new ActionNotFoundException(actionName));
    }
}

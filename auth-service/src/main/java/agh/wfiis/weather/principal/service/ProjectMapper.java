package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ProjectEntity;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class ProjectMapper {
    private final ActionMapper actionMapper;

    ProjectMapper(ActionMapper actionMapper) {
        this.actionMapper = actionMapper;
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
                actionMapper.mapActionEntitiesToProjectActions(entity.getActions()));
    }

    private ProjectEntity mapProjectDtoToProjectEntity(ProjectDto dto) {
        ProjectEntity entity = new ProjectEntity();

        entity.setName(dto.name());
        entity.addActions(actionMapper.mapProjectActionsToActionEntities(dto.actions()));

        return entity;
    }

    private ProjectEntity mapProjectNameToProjectEntity(String projectName) {
        ProjectEntity entity = new ProjectEntity();

        entity.setName(projectName);
        entity.addActions(Collections.emptySet());

        return entity;
    }
}

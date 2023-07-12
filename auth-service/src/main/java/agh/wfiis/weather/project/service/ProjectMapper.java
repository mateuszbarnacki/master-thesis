package agh.wfiis.weather.project.service;

import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    public Set<ProjectEntity> mapDtosToEntities(Set<ProjectDto> projectDtos) {
        return projectDtos.stream().map(this::mapDtoToEntity).collect(Collectors.toSet());
    }

    public Set<ProjectDto> mapEntitiesToDtos(Set<ProjectEntity> entities) {
        return entities.stream().map(this::mapEntityToDto).collect(Collectors.toSet());
    }

    ProjectEntity mapDtoToEntity(ProjectDto dto) {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(dto.name());
        return entity;
    }

    ProjectDto mapEntityToDto(ProjectEntity entity) {
        return new ProjectDto(entity.getName());
    }
}

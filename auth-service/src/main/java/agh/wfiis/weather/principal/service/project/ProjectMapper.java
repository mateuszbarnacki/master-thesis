package agh.wfiis.weather.principal.service.project;

import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ProjectEntity;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    ProjectEntity mapDtoToEntity(ProjectDto dto) {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(dto.name());
        return entity;
    }

    ProjectDto mapEntityToDto(ProjectEntity entity) {
        return new ProjectDto(entity.getName());
    }
}

package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.exception.ProjectNotFoundException;
import agh.wfiis.weather.principal.dto.ProjectActionsDto;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class ProjectRestService implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final ActionMapper actionMapper;

    public ProjectRestService(ProjectRepository projectRepository, ProjectMapper projectMapper, ActionMapper actionMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.actionMapper = actionMapper;
    }

    @Override
    public ProjectActionsDto updateActions(ProjectActionsDto projectActionsDto) {
        Set<ProjectDto> projects = projectActionsDto.projects();
        Set<ProjectEntity> entities = new HashSet<>();

        for (ProjectDto dto : projects) {
            ProjectEntity entity = projectRepository.findById(dto.id())
                    .orElseThrow(() -> new ProjectNotFoundException(dto.name()));
            entity.clearActions();
            entity.addActions(actionMapper.mapProjectActionsToActionEntities(dto.actions()));
            entities.add(projectRepository.save(entity));
        }

        return new ProjectActionsDto(projectMapper.mapProjectEntitiesToProjectDtos(entities));
    }

    @Override
    public void deleteProjectsByName(String name) {
        projectRepository.deleteAllByName(name);
    }
}

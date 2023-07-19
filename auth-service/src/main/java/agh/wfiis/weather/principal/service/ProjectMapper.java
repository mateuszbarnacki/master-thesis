package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.exception.ActionNotFoundException;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import agh.wfiis.weather.principal.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class ProjectMapper {
    private final UserRepository userRepository;
    private final ActionRepository actionRepository;
    private final Map<String, ProjectAction> stringToProjectAction = Map.of(
            ProjectAction.ADD_MEASUREMENT.getAction(), ProjectAction.ADD_MEASUREMENT,
            ProjectAction.CLONE_PROJECT.getAction(), ProjectAction.CLONE_PROJECT);

    ProjectMapper(UserRepository userRepository, ActionRepository actionRepository) {
        this.userRepository = userRepository;
        this.actionRepository = actionRepository;
    }

    Set<ProjectDto> mapProjectEntitiesToProjectDtos(Set<ProjectEntity> entities) {
        return entities.stream()
                .map(this::mapProjectEntityToProjectDto)
                .collect(Collectors.toSet());
    }

    Set<ProjectEntity> mapProjectDtosToEntities(Set<ProjectDto> dtos, String username) {
        return dtos.stream()
                .map(projectDto -> mapProjectDtoToProjectEntity(projectDto, username))
                .collect(Collectors.toSet());
    }

    private ProjectDto mapProjectEntityToProjectDto(ProjectEntity entity) {
        return new ProjectDto(entity.getName(), mapEntitiesToEnums(entity.getActions()));
    }

    private ProjectEntity mapProjectDtoToProjectEntity(ProjectDto dto, String username) {
        ProjectEntity entity = new ProjectEntity();

        entity.setUser(getUser(username));
        entity.setName(dto.name());
        entity.addActions(mapEnumsToEntities(dto.actions()));

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

    private UserEntity getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Could not find user with given username: " + username));
    }
}

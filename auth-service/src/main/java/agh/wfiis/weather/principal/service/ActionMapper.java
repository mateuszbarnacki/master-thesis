package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.exception.ActionNotFoundException;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class ActionMapper {
    private final ActionRepository actionRepository;
    private final Map<String, ProjectAction> stringToProjectAction = Map.of(
            ProjectAction.ADD_MEASUREMENT.getAction(), ProjectAction.ADD_MEASUREMENT,
            ProjectAction.READ_MEASUREMENT.getAction(), ProjectAction.READ_MEASUREMENT);

    ActionMapper(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    Set<ProjectAction> mapActionEntitiesToProjectActions(Set<ActionEntity> actionEntities) {
        return actionEntities.stream()
                .map(action -> stringToProjectAction.get(action.getName()))
                .collect(Collectors.toSet());
    }

    Set<ActionEntity> mapProjectActionsToActionEntities(Set<ProjectAction> actions) {
        Set<ActionEntity> actionEntities = new HashSet<>();
        actions.forEach(projectAction -> actionEntities.add(getActionEntity(projectAction.getAction())));
        return actionEntities;
    }

    private ActionEntity getActionEntity(String actionName) {
        return actionRepository.findActionEntityByName(actionName)
                .orElseThrow(() -> new ActionNotFoundException(actionName));
    }
}

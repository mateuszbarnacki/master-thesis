package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@SpringBootTest
class ActionMapperTest {
    @Autowired
    private ActionMapper actionMapper;
    @MockBean
    private ActionRepository actionRepository;

    @Test
    void shouldMapActionEntitiesToProjectActions() {
        Set<ActionEntity> actionEntities = givenSetOfActionEntities();

        Set<ProjectAction> projectActions = whenMapActionEntitiesToProjectActions(actionEntities);

        thenCollectionIsNotEmpty(projectActions);
        thenCollectionContainsNotNullElements(projectActions);
    }

    @Test
    void shouldMapProjectActionsToActionEntities() {
        Mockito.when(actionRepository.findActionEntityByName(ArgumentMatchers.anyString()))
                .thenReturn(Optional.of(new ActionEntity()));
        Set<ProjectAction> projectActions = givenSetOfProjectActions();

        Set<ActionEntity> actionEntities = whenMapProjectActionsToActionEntities(projectActions);

        thenCollectionIsNotEmpty(actionEntities);
        thenCollectionContainsNotNullElements(actionEntities);
    }

    private Set<ActionEntity> givenSetOfActionEntities() {
        ActionEntity actionEntity = new ActionEntity();
        actionEntity.setName("READ_MEASUREMENT");
        return Set.of(actionEntity);
    }

    private Set<ProjectAction> givenSetOfProjectActions() {
        return Set.of(ProjectAction.ADD_MEASUREMENT);
    }

    private Set<ProjectAction> whenMapActionEntitiesToProjectActions(Set<ActionEntity> actionEntities) {
        return actionMapper.mapActionEntitiesToProjectActions(actionEntities);
    }

    private Set<ActionEntity> whenMapProjectActionsToActionEntities(Set<ProjectAction> projectActions) {
        return actionMapper.mapProjectActionsToActionEntities(projectActions);
    }

    private void thenCollectionIsNotEmpty(Set<?> collection) {
        Assertions.assertFalse(collection.isEmpty());
    }

    private void thenCollectionContainsNotNullElements(Set<?> collection) {
        Assertions.assertTrue(collection.stream().allMatch(Objects::nonNull));
    }
}

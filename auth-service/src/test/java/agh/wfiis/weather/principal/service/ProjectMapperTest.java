package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class ProjectMapperTest {
    private static final String FIRST_PROJECT_NAME = "Test Project 1";
    private static final String SECOND_PROJECT_NAME = "Test Project 2";
    private static final String THIRD_PROJECT_NAME = "Project 3";
    private static final String FOURTH_PROJECT_NAME = "Test 4";
    @Autowired
    private ProjectMapper projectMapper;
    @MockBean
    private ActionRepository actionRepository;

    @Test
    void shouldMapSetOfDtosToSetOfEntities() {
        ActionEntity cloneProject = new ActionEntity();
        cloneProject.setName(ProjectAction.CLONE_PROJECT.getAction());
        Mockito.when(actionRepository.findActionEntityByName(ProjectAction.CLONE_PROJECT.getAction()))
                .thenReturn(Optional.of(cloneProject));
        Set<ProjectDto> dtos = givenSetOfProjectDtos();

        Set<ProjectEntity> entities = whenMapProjectDtosToProjectEntities(dtos);

        thenSetContainsProjectEntities(entities);
    }

    @Test
    void shouldMapSetOfEntitiesToSetOfDtos() {
        Set<ProjectEntity> entities = givenSetOfProjectEntities();

        Set<ProjectDto> dtos = whenMapProjectEntitiesToProjectDtos(entities);

        thenSetContainsProjectDto(dtos);
    }

    @Test
    void shouldMapSetOfNamesToSetOfEntities() {
        Set<String> projectNames = givenSetOfProjectNames();

        Set<ProjectEntity> entities = whenMapProjectNamesToProjectEntities(projectNames);

        thenSetContainsProjectEntities(entities);
        thenEveryProjectEntityDoesNotHaveAnyAction(entities);
    }

    private Set<ProjectDto> givenSetOfProjectDtos() {
        return Set.of(new ProjectDto(FIRST_PROJECT_NAME, Set.of(ProjectAction.CLONE_PROJECT)),
                new ProjectDto(THIRD_PROJECT_NAME, Set.of()));
    }

    private Set<ProjectEntity> givenSetOfProjectEntities() {
        ProjectEntity first = new ProjectEntity();
        first.setName(SECOND_PROJECT_NAME);
        ProjectEntity second = new ProjectEntity();
        second.setName(FOURTH_PROJECT_NAME);
        return Set.of(first, second);
    }

    private Set<String> givenSetOfProjectNames() {
        return Set.of("Test1", "Test2", "Test3");
    }

    private Set<ProjectEntity> whenMapProjectDtosToProjectEntities(Set<ProjectDto> projectDtos) {
        return projectMapper.mapProjectDtosToEntities(projectDtos);
    }

    private Set<ProjectDto> whenMapProjectEntitiesToProjectDtos(Set<ProjectEntity> entities) {
        return projectMapper.mapProjectEntitiesToProjectDtos(entities);
    }

    private Set<ProjectEntity> whenMapProjectNamesToProjectEntities(Set<String> projectNames) {
        return projectMapper.mapProjectNamesToEntities(projectNames);
    }

    private void thenSetContainsProjectEntities(Set<ProjectEntity> entities) {
        Assertions.assertFalse(entities.isEmpty());
    }

    private void thenSetContainsProjectDto(Set<ProjectDto> dtos) {
        Assertions.assertFalse(dtos.isEmpty());
    }

    private void thenEveryProjectEntityDoesNotHaveAnyAction(Set<ProjectEntity> entities) {
        for (ProjectEntity entity : entities) {
            Assertions.assertFalse(entity.getName().isBlank());
            Assertions.assertTrue(entity.getActions().isEmpty());
        }
    }
}

package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ActionEntity;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.ActionRepository;
import agh.wfiis.weather.principal.repository.UserRepository;
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
    private static final String USERNAME = "Tester";
    private static final String FIRST_PROJECT_NAME = "Test Project 1";
    private static final String SECOND_PROJECT_NAME = "Test Project 2";
    private static final String THIRD_PROJECT_NAME = "Project 3";
    private static final String FOURTH_PROJECT_NAME = "Test 4";
    @Autowired
    private ProjectMapper projectMapper;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private ActionRepository actionRepository;

    @Test
    void shouldMapSetOfDtosToSetOfEntities() {
        UserEntity tester = new UserEntity();
        tester.setUsername(USERNAME);
        ActionEntity cloneProject = new ActionEntity();
        cloneProject.setName(ProjectAction.CLONE_PROJECT.getAction());
        Mockito.when(userRepository.findByUsername(USERNAME)).thenReturn(Optional.of(tester));
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

    private Set<ProjectEntity> whenMapProjectDtosToProjectEntities(Set<ProjectDto> projectDtos) {
        return projectMapper.mapProjectDtosToEntities(projectDtos, USERNAME);
    }

    private Set<ProjectDto> whenMapProjectEntitiesToProjectDtos(Set<ProjectEntity> entities) {
        return projectMapper.mapProjectEntitiesToProjectDtos(entities);
    }

    private void thenSetContainsProjectEntities(Set<ProjectEntity> entities) {
        Assertions.assertFalse(entities.isEmpty());
    }

    private void thenSetContainsProjectDto(Set<ProjectDto> dtos) {
        Assertions.assertFalse(dtos.isEmpty());
    }
}

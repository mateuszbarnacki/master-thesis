package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.principal.dto.ProjectActionsDto;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.repository.ProjectRepository;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class ProjectRestServiceTest {
    private static final ProjectDto FIRST = new ProjectDto(-1L, "Test Proj", Set.of(ProjectAction.ADD_MEASUREMENT));
    @Autowired
    private ProjectRestService projectRestService;
    @MockBean
    private ProjectRepository projectRepository;
    @MockBean
    private ProjectMapper projectMapper;

    @Test
    void shouldUpdateActions() {
        ProjectEntity first = new ProjectEntity();
        first.setId(-1L);
        Mockito.when(projectRepository.findById(-1L)).thenReturn(Optional.of(first));
        Mockito.when(projectRepository.save(first)).thenReturn(first);
        Mockito.when(projectMapper.mapProjectEntitiesToProjectDtos(Set.of(first)))
                .thenReturn(Set.of(FIRST));
        ProjectActionsDto projectActionsDto = givenProjectActionsDto();

        ProjectActionsDto updated = whenUpdateActions(projectActionsDto);

        thenUpdatedProjectActionContainsFieldsWithValues(updated);
    }

    private ProjectActionsDto givenProjectActionsDto() {
        Set<ProjectDto> projects = Set.of(FIRST);
        return new ProjectActionsDto(projects);
    }

    private ProjectActionsDto whenUpdateActions(ProjectActionsDto projectActionsDto) {
        return projectRestService.updateActions(projectActionsDto);
    }

    private void thenUpdatedProjectActionContainsFieldsWithValues(ProjectActionsDto projectActionsDto) {
        AssertionsForClassTypes.assertThat(projectActionsDto)
                .hasFieldOrPropertyWithValue("projects", Set.of(FIRST));
    }
}

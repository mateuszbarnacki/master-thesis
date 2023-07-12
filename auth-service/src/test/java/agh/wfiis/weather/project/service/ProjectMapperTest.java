package agh.wfiis.weather.project.service;

import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;

class ProjectMapperTest {
    private static final String FIRST_PROJECT_NAME = "Test Project 1";
    private static final String SECOND_PROJECT_NAME = "Test Project 2";
    private final ProjectMapper projectMapper;

    ProjectMapperTest() {
        this.projectMapper = new ProjectMapper();
    }

    @Test
    void shouldMapDtoToEntity() {
        ProjectDto dto = givenProjectDto();

        ProjectEntity entity = whenMapDtoToEntity(dto);

        thenProjectEntityContainsFieldsWithValues(entity);
    }

    @Test
    void shouldMapEntityToDto() {
        ProjectEntity entity = givenProjectEntity();

        ProjectDto dto = whenMapEntityToDto(entity);

        thenProjectDtoContainsFieldsWithValues(dto);
    }

    private ProjectDto givenProjectDto() {
        return new ProjectDto(FIRST_PROJECT_NAME);
    }

    private ProjectEntity givenProjectEntity() {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(SECOND_PROJECT_NAME);
        return entity;
    }

    private ProjectEntity whenMapDtoToEntity(ProjectDto dto) {
        return projectMapper.mapDtoToEntity(dto);
    }

    private ProjectDto whenMapEntityToDto(ProjectEntity entity) {
        return projectMapper.mapEntityToDto(entity);
    }

    private void thenProjectEntityContainsFieldsWithValues(ProjectEntity entity) {
        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("name", FIRST_PROJECT_NAME);
    }

    private void thenProjectDtoContainsFieldsWithValues(ProjectDto dto) {
        AssertionsForClassTypes.assertThat(dto)
                .hasFieldOrPropertyWithValue("name", SECOND_PROJECT_NAME);
    }
}

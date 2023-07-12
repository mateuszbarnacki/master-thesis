package agh.wfiis.weather.project.service;

import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Set;

class ProjectMapperTest {
    private static final String FIRST_PROJECT_NAME = "Test Project 1";
    private static final String SECOND_PROJECT_NAME = "Test Project 2";
    private static final String THIRD_PROJECT_NAME = "Project 3";
    private static final String FOURTH_PROJECT_NAME = "Test 4";
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

    @Test
    void shouldMapSetOfDtosToSetOfEntities() {
        Set<ProjectDto> dtos = givenSetOfProjectDtos();

        Set<ProjectEntity> entities = whenMapDtosToEntities(dtos);

        thenSetContainsProjectEntities(entities);
    }

    @Test
    void shouldMapSetOfEntitiesToSetOfDtos() {
        Set<ProjectEntity> entities = givenSetOfProjectEntities();

        Set<ProjectDto> dtos = whenMapEntitiesToDtos(entities);

        thenSetContainsProjectDto(dtos);
    }

    private ProjectDto givenProjectDto() {
        return new ProjectDto(FIRST_PROJECT_NAME);
    }

    private ProjectEntity givenProjectEntity() {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(SECOND_PROJECT_NAME);
        return entity;
    }

    private Set<ProjectDto> givenSetOfProjectDtos() {
        return Set.of(new ProjectDto(FIRST_PROJECT_NAME), new ProjectDto(THIRD_PROJECT_NAME));
    }

    private Set<ProjectEntity> givenSetOfProjectEntities() {
        ProjectEntity first = new ProjectEntity();
        first.setName(SECOND_PROJECT_NAME);
        ProjectEntity second = new ProjectEntity();
        second.setName(FOURTH_PROJECT_NAME);
        return Set.of(first, second);
    }

    private ProjectEntity whenMapDtoToEntity(ProjectDto dto) {
        return projectMapper.mapDtoToEntity(dto);
    }

    private ProjectDto whenMapEntityToDto(ProjectEntity entity) {
        return projectMapper.mapEntityToDto(entity);
    }

    private Set<ProjectEntity> whenMapDtosToEntities(Set<ProjectDto> projectDtos) {
        return projectMapper.mapDtosToEntities(projectDtos);
    }

    private Set<ProjectDto> whenMapEntitiesToDtos(Set<ProjectEntity> entities) {
        return projectMapper.mapEntitiesToDtos(entities);
    }

    private void thenProjectEntityContainsFieldsWithValues(ProjectEntity entity) {
        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("name", FIRST_PROJECT_NAME);
    }

    private void thenProjectDtoContainsFieldsWithValues(ProjectDto dto) {
        AssertionsForClassTypes.assertThat(dto)
                .hasFieldOrPropertyWithValue("name", SECOND_PROJECT_NAME);
    }

    private void thenSetContainsProjectEntities(Set<ProjectEntity> entities) {
        Assertions.assertFalse(entities.isEmpty());
    }

    private void thenSetContainsProjectDto(Set<ProjectDto> dtos) {
        Assertions.assertFalse(dtos.isEmpty());
    }
}

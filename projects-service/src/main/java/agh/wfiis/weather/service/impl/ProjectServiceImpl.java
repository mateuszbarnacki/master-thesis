package agh.wfiis.weather.service.impl;

import agh.wfiis.weather.dto.ProjectDto;
import agh.wfiis.weather.dto.ProjectNameDto;
import agh.wfiis.weather.mapper.ProjectMapper;
import agh.wfiis.weather.model.Project;
import agh.wfiis.weather.repository.ProjectRepository;
import agh.wfiis.weather.service.api.ProjectService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProjectServiceImpl.class);
    private static final String AUTH_SERVICE = "http://localhost:13402";
    private final ProjectRepository repository;
    private final ProjectMapper mapper;

    public ProjectServiceImpl(ProjectRepository repository, ProjectMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public ProjectDto getProject(String name) {
        Project entity = repository.findByName(name);
        return Optional.ofNullable(entity)
                .map(mapper::mapEntityToDto)
                .orElseThrow(() -> new IllegalArgumentException("Could not find entity with given name: " + name));
    }

    @Override
    public List<ProjectDto> getProjects() {
        return repository.findAll().stream()
                .map(mapper::mapEntityToDto)
                .toList();
    }

    @Override
    public ProjectDto addProject(ProjectDto projectDto) {
        Project entity = mapper.mapDtoToEntity(projectDto);
        Project saved = repository.save(entity);
        sendProjectName(saved.getName());
        return mapper.mapEntityToDto(saved);
    }

    @Override
    public void deleteProject(String name) {
        repository.deleteByName(name);
    }

    private void sendProjectName(String projectName) {
        try {
            ProjectNameDto projectNameDto = new ProjectNameDto(projectName);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(projectNameDto);
            WebClient.builder()
                    .baseUrl(AUTH_SERVICE)
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .build()
                    .post()
                    .uri("/projects")
                    .bodyValue(json)
                    .retrieve();
        } catch (JsonProcessingException jpe) {
            LOGGER.error("Could not send project name to auth service: {}", jpe.getMessage());
        }
    }
}

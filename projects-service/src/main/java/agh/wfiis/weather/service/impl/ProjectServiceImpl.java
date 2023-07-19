package agh.wfiis.weather.service.impl;

import agh.wfiis.weather.dto.ProjectDto;
import agh.wfiis.weather.mapper.ProjectMapper;
import agh.wfiis.weather.model.Project;
import agh.wfiis.weather.repository.ProjectRepository;
import agh.wfiis.weather.service.api.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
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
    public List<String> getProjectNames() {
        return repository.findAll().stream()
                .map(mapper::mapEntityToDto)
                .map(ProjectDto::getName)
                .toList();
    }

    @Override
    public ProjectDto addProject(ProjectDto projectDto) {
        Project entity = mapper.mapDtoToEntity(projectDto);
        Project saved = repository.save(entity);
        return mapper.mapEntityToDto(saved);
    }

    @Override
    public void deleteProject(String name) {
        repository.deleteByName(name);
    }
}

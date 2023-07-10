package agh.wfiis.weather.project.service;

import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import agh.wfiis.weather.project.repository.ProjectRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class ProjectRestService implements ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectRestService(ProjectRepository projectRepository, ProjectMapper projectMapper) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public List<ProjectDto> getProjects() {
        return StreamSupport.stream(projectRepository.findAll().spliterator(), false)
                .map(projectMapper::mapEntityToDto)
                .toList();
    }

    @Override
    public void addProject(@NotNull ProjectDto projectDto) {
        ProjectEntity project = projectMapper.mapDtoToEntity(projectDto);
        projectRepository.save(project);
    }
}

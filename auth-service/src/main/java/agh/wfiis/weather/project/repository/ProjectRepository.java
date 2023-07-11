package agh.wfiis.weather.project.repository;

import agh.wfiis.weather.project.model.ProjectEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
}

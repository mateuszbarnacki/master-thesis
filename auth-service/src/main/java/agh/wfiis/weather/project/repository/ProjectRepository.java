package agh.wfiis.weather.project.repository;

import agh.wfiis.weather.project.model.ProjectEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    Optional<ProjectEntity> findByName(String name);
}

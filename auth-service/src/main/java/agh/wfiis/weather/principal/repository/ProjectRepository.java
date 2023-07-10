package agh.wfiis.weather.principal.repository;

import agh.wfiis.weather.principal.model.ProjectEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    Optional<ProjectEntity> findByName(String name);
}

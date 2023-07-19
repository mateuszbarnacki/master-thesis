package agh.wfiis.weather.principal.repository;

import agh.wfiis.weather.principal.model.ActionEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActionRepository extends CrudRepository<ActionEntity, Long> {
    Optional<ActionEntity> findActionEntityByName(String name);
}

package agh.wfiis.weather.principal.repository;

import agh.wfiis.weather.principal.model.PrivilegeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrivilegeRepository extends CrudRepository<PrivilegeEntity, Long> {
    Optional<PrivilegeEntity> findByName(String name);
}

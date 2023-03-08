package agh.wfiis.weather.repository;

import agh.wfiis.weather.model.PrivilegeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository extends CrudRepository<PrivilegeEntity, Long> {
}

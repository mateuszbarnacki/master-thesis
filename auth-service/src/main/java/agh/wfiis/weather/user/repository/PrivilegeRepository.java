package agh.wfiis.weather.user.repository;

import agh.wfiis.weather.user.model.PrivilegeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository extends CrudRepository<PrivilegeEntity, Long> {
}

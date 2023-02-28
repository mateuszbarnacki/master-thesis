package agh.wfiis.weather.repository;

import agh.wfiis.weather.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    Project findByName(String name);

    @Query(value = "{'name' : ?0}", delete = true)
    void deleteByName(String name);
}

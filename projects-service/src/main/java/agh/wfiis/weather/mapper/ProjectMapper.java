package agh.wfiis.weather.mapper;

import agh.wfiis.weather.common.MeasurementMode;
import agh.wfiis.weather.common.SpatialMode;
import agh.wfiis.weather.common.TimeMode;
import agh.wfiis.weather.dto.ProjectDto;
import agh.wfiis.weather.dto.sensor.SensorDto;
import agh.wfiis.weather.mapper.sensor.SensorDtoFactory;
import agh.wfiis.weather.mapper.sensor.SensorEntityFactory;
import agh.wfiis.weather.model.Project;
import agh.wfiis.weather.model.sensor.Sensor;
import com.google.common.collect.ImmutableBiMap;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectMapper {
    private final SensorEntityFactory entityFactory;
    private final SensorDtoFactory dtoFactory;
    private final ImmutableBiMap<ProjectDto.MeasurementMode, MeasurementMode> mapDtoToEntityMeasurementMode = ImmutableBiMap.of(
            ProjectDto.MeasurementMode.SINGLE, MeasurementMode.SINGLE,
            ProjectDto.MeasurementMode.NETWORK, MeasurementMode.NETWORK
    );
    private final ImmutableBiMap<ProjectDto.SpatialMode, SpatialMode> mapDtoToEntitySpatialMode =
            ImmutableBiMap.of(
                    ProjectDto.SpatialMode.STATIONARY, SpatialMode.STATIONARY,
                    ProjectDto.SpatialMode.MOBILE_2D, SpatialMode.MOBILE_2D,
                    ProjectDto.SpatialMode.MOBILE_3D, SpatialMode.MOBILE_3D
            );
    private final ImmutableBiMap<ProjectDto.TimeMode, TimeMode> mapDtoToEntityTimeMode = ImmutableBiMap.of(
            ProjectDto.TimeMode.OFFLINE, TimeMode.OFFLINE,
            ProjectDto.TimeMode.TEMPORARY, TimeMode.TEMPORARY,
            ProjectDto.TimeMode.PERMANENTLY, TimeMode.PERMANENTLY
    );

    public ProjectMapper(SensorEntityFactory entityFactory, SensorDtoFactory dtoFactory) {
        this.entityFactory = entityFactory;
        this.dtoFactory = dtoFactory;
    }


    public ProjectDto mapEntityToDto(Project project) {
        return ProjectDto.builder()
                .name(project.getName())
                .acronym(project.getAcronym())
                .description(project.getDescription())
                .timeMode(mapDtoToEntityTimeMode.inverse().get(project.getTimeMode()))
                .spatialMode(mapDtoToEntitySpatialMode.inverse().get(project.getSpatialMode()))
                .measurementMode(mapDtoToEntityMeasurementMode.inverse().get(project.getMeasurementMode()))
                .sensors(mapEntityToDtoSensor(project.getSensors()))
                .build();
    }

    public Project mapDtoToEntity(ProjectDto dto) {
        Project project = new Project();

        project.setName(dto.getName());
        project.setAcronym(dto.getAcronym());
        project.setDescription(dto.getDescription());
        project.setTimeMode(mapDtoToEntityTimeMode.get(dto.getTimeMode()));
        project.setSpatialMode(mapDtoToEntitySpatialMode.get(dto.getSpatialMode()));
        project.setMeasurementMode(mapDtoToEntityMeasurementMode.get(dto.getMeasurementMode()));
        project.setSensors(mapDtoToEntitySensor(dto.getSensors()));

        return project;
    }

    private List<SensorDto> mapEntityToDtoSensor(List<Sensor> sensors) {
        return sensors.stream()
                .map(dtoFactory::create)
                .toList();
    }

    private List<Sensor> mapDtoToEntitySensor(List<SensorDto> sensorDtos) {
        return sensorDtos.stream()
                .map(entityFactory::create)
                .toList();
    }
}

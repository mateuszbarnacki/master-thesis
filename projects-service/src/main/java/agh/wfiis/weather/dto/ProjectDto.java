package agh.wfiis.weather.dto;

import agh.wfiis.weather.dto.sensor.SensorDto;
import jakarta.validation.constraints.NotBlank;

import java.beans.ConstructorProperties;
import java.util.Collections;
import java.util.List;

public class ProjectDto {
    private final String acronym;
    @NotBlank(message = "Project name is mandatory")
    private final String name;
    private final String description;
    private final TimeMode timeMode;
    private final SpatialMode spatialMode;
    private final MeasurementMode measurementMode;
    private final List<SensorDto> sensors;

    @ConstructorProperties({"acronym", "name", "description", "timeMode", "spatialMode", "measurementMode", "sensors"})
    public ProjectDto(String acronym, String name, String description,
                      TimeMode timeMode, SpatialMode spatialMode,
                      MeasurementMode measurementMode, List<SensorDto> sensors) {
        this.acronym = acronym;
        this.name = name;
        this.description = description;
        this.timeMode = timeMode;
        this.spatialMode = spatialMode;
        this.measurementMode = measurementMode;
        this.sensors = sensors;
    }

    private ProjectDto(ProjectDtoBuilder builder) {
        this.acronym = builder.acronym;
        this.name = builder.name;
        this.description = builder.description;
        this.timeMode = builder.timeMode;
        this.spatialMode = builder.spatialMode;
        this.measurementMode = builder.measurementMode;
        this.sensors = builder.sensors;
    }

    public static ProjectDtoBuilder builder() {
        return new ProjectDtoBuilder();
    }

    public String getAcronym() {
        return acronym;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public TimeMode getTimeMode() {
        return timeMode;
    }

    public SpatialMode getSpatialMode() {
        return spatialMode;
    }

    public MeasurementMode getMeasurementMode() {
        return measurementMode;
    }

    public List<SensorDto> getSensors() {
        return sensors;
    }

    public static class ProjectDtoBuilder {
        private String acronym;
        private String name;
        private String description;
        private TimeMode timeMode;
        private SpatialMode spatialMode;
        private MeasurementMode measurementMode;
        private List<SensorDto> sensors = Collections.emptyList();

        public ProjectDtoBuilder acronym(final String acronym) {
            this.acronym = acronym;
            return this;
        }

        public ProjectDtoBuilder name(final String name) {
            this.name = name;
            return this;
        }

        public ProjectDtoBuilder description(final String description) {
            this.description = description;
            return this;
        }

        public ProjectDtoBuilder timeMode(final TimeMode timeMode) {
            this.timeMode = timeMode;
            return this;
        }

        public ProjectDtoBuilder spatialMode(final SpatialMode spatialMode) {
            this.spatialMode = spatialMode;
            return this;
        }

        public ProjectDtoBuilder measurementMode(final MeasurementMode measurementMode) {
            this.measurementMode = measurementMode;
            return this;
        }

        public ProjectDtoBuilder sensors(final List<SensorDto> sensors) {
            this.sensors = sensors;
            return this;
        }

        public ProjectDto build() {
            return new ProjectDto(this);
        }
    }

    public enum MeasurementMode {
        SINGLE,
        NETWORK
    }

    public enum TimeMode {
        PERMANENTLY,
        TEMPORARY,
        OFFLINE
    }

    public enum SpatialMode {
        STATIONARY,
        MOBILE_2D,
        MOBILE_3D
    }
}

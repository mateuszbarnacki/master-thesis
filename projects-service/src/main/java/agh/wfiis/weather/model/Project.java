package agh.wfiis.weather.model;

import agh.wfiis.weather.common.MeasurementMode;
import agh.wfiis.weather.common.SpatialMode;
import agh.wfiis.weather.common.TimeMode;
import agh.wfiis.weather.model.sensor.Sensor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "project")
public class Project {
    @Id
    private String name;
    private String acronym;
    private String description;
    private TimeMode timeMode;
    private SpatialMode spatialMode;
    private MeasurementMode measurementMode;
    private List<Sensor> sensors;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TimeMode getTimeMode() {
        return timeMode;
    }

    public void setTimeMode(TimeMode timeMode) {
        this.timeMode = timeMode;
    }

    public SpatialMode getSpatialMode() {
        return spatialMode;
    }

    public void setSpatialMode(SpatialMode spatialMode) {
        this.spatialMode = spatialMode;
    }

    public MeasurementMode getMeasurementMode() {
        return measurementMode;
    }

    public void setMeasurementMode(MeasurementMode measurementMode) {
        this.measurementMode = measurementMode;
    }

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }
}

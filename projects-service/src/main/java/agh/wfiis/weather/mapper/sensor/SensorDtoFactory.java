package agh.wfiis.weather.mapper.sensor;

import agh.wfiis.weather.dto.measurement.MeasurementSchemaDto;
import agh.wfiis.weather.dto.sensor.MobileSensorDto;
import agh.wfiis.weather.dto.sensor.SensorDto;
import agh.wfiis.weather.dto.sensor.StationarySensorDto;
import agh.wfiis.weather.mapper.measurement.MeasurementSchemaMapper;
import agh.wfiis.weather.model.sensor.MobileSensor;
import agh.wfiis.weather.model.sensor.Sensor;
import agh.wfiis.weather.model.sensor.StationarySensor;
import org.springframework.stereotype.Component;

@Component
public class SensorDtoFactory {
    private final MeasurementSchemaMapper measurementSchemaMapper;

    public SensorDtoFactory(MeasurementSchemaMapper measurementSchemaMapper) {
        this.measurementSchemaMapper = measurementSchemaMapper;
    }

    public SensorDto create(Sensor entity) {
        if (entity instanceof StationarySensor stationarySensor) {
            return buildStationarySensor(stationarySensor);
        } else if (entity instanceof MobileSensor mobileSensor) {
            return buildMobileSensor(mobileSensor);
        }
        return null;
    }

    private StationarySensorDto buildStationarySensor(StationarySensor sensor) {
        MeasurementSchemaDto measurementSchemaDto = measurementSchemaMapper.mapEntityToDto(sensor.getMeasurementSchema());
        return StationarySensorDto.builder()
                .deviceId(sensor.getDeviceId())
                .latitude(sensor.getLatitude())
                .longitude(sensor.getLongitude())
                .altitude(sensor.getAltitude())
                .measurementSchema(measurementSchemaDto)
                .build();
    }

    private MobileSensorDto buildMobileSensor(MobileSensor sensor) {
        MeasurementSchemaDto measurementSchemaDto = measurementSchemaMapper.mapEntityToDto(sensor.getMeasurementSchema());
        return MobileSensorDto.builder()
                .deviceId(sensor.getDeviceId())
                .measurementSchema(measurementSchemaDto)
                .build();
    }
}

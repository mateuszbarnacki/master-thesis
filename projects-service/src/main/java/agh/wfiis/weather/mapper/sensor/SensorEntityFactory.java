package agh.wfiis.weather.mapper.sensor;

import agh.wfiis.weather.dto.sensor.MobileSensorDto;
import agh.wfiis.weather.dto.sensor.SensorDto;
import agh.wfiis.weather.dto.sensor.StationarySensorDto;
import agh.wfiis.weather.mapper.measurement.MeasurementSchemaMapper;
import agh.wfiis.weather.model.measurement.MeasurementSchema;
import agh.wfiis.weather.model.sensor.MobileSensor;
import agh.wfiis.weather.model.sensor.Sensor;
import agh.wfiis.weather.model.sensor.StationarySensor;
import org.springframework.stereotype.Component;

@Component
public class SensorEntityFactory {
    private final MeasurementSchemaMapper measurementSchemaMapper;

    public SensorEntityFactory(MeasurementSchemaMapper measurementSchemaMapper) {
        this.measurementSchemaMapper = measurementSchemaMapper;
    }

    public Sensor create(SensorDto dto) {
        if (dto instanceof StationarySensorDto stationarySensorDto) {
            return buildStationarySensor(stationarySensorDto);
        } else if (dto instanceof MobileSensorDto mobileSensorDto) {
            return buildMobileSensor(mobileSensorDto);
        }
        return null;
    }

    private StationarySensor buildStationarySensor(StationarySensorDto dto) {
        MeasurementSchema measurementSchema = measurementSchemaMapper.mapDtoToEntity(dto.getMeasurementSchema());
        StationarySensor sensor = new StationarySensor();

        sensor.setDeviceId(dto.getDeviceId());
        sensor.setLatitude(dto.getLatitude());
        sensor.setLongitude(dto.getLongitude());
        sensor.setAltitude(dto.getAltitude());
        sensor.setMeasurementSchema(measurementSchema);

        return sensor;

    }

    private MobileSensor buildMobileSensor(MobileSensorDto dto) {
        MeasurementSchema measurementSchema = measurementSchemaMapper.mapDtoToEntity(dto.getMeasurementSchema());
        MobileSensor sensor = new MobileSensor();

        sensor.setDeviceId(dto.getDeviceId());
        sensor.setMeasurementSchema(measurementSchema);

        return sensor;
    }
}

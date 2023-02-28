package agh.wfiis.weather.mapper.measurement;

import agh.wfiis.weather.dto.devicemetadata.DeviceMetadataDto;
import agh.wfiis.weather.dto.measurement.MeasurementDto;
import agh.wfiis.weather.dto.measurement.MeasurementSchemaDto;
import agh.wfiis.weather.mapper.devicemetadata.DeviceMetadataDtoFactory;
import agh.wfiis.weather.mapper.devicemetadata.DeviceMetadataEntityFactory;
import agh.wfiis.weather.model.devicemetadata.DeviceMetadata;
import agh.wfiis.weather.model.measurement.Measurement;
import agh.wfiis.weather.model.measurement.MeasurementSchema;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MeasurementSchemaMapper {
    private final DeviceMetadataDtoFactory dtoFactory;
    private final DeviceMetadataEntityFactory entityFactory;
    private final MeasurementMapper measurementMapper;

    public MeasurementSchemaMapper(DeviceMetadataDtoFactory dtoFactory,
                                   DeviceMetadataEntityFactory entityFactory,
                                   MeasurementMapper measurementMapper) {
        this.dtoFactory = dtoFactory;
        this.entityFactory = entityFactory;
        this.measurementMapper = measurementMapper;
    }

    public MeasurementSchemaDto mapEntityToDto(MeasurementSchema schema) {
        List<MeasurementDto> measurements = mapEntityToDtoMeasurements(schema.getMeasurements());
        DeviceMetadataDto deviceMetadata = dtoFactory.create(schema.getDeviceMetadata());
        return MeasurementSchemaDto.builder()
                .measurements(measurements)
                .deviceMetadata(deviceMetadata)
                .build();
    }

    public MeasurementSchema mapDtoToEntity(MeasurementSchemaDto dto) {
        List<Measurement> measurements = mapDtoToEntityMeasurements(dto.getMeasurements());
        DeviceMetadata metadata = entityFactory.create(dto.getDeviceMetadata());

        MeasurementSchema schema = new MeasurementSchema();
        schema.setMeasurements(measurements);
        schema.setDeviceMetadata(metadata);
        return schema;
    }

    private List<Measurement> mapDtoToEntityMeasurements(List<MeasurementDto> dtos) {
        return dtos.stream()
                .map(measurementMapper::mapToEntity)
                .toList();
    }

    private List<MeasurementDto> mapEntityToDtoMeasurements(List<Measurement> entities) {
        return entities.stream()
                .map(measurementMapper::mapToDto)
                .toList();
    }
}

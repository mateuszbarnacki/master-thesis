package agh.wfiis.weather.mapper.measurement;

import agh.wfiis.weather.dto.measurement.MeasurementDto;
import agh.wfiis.weather.dto.measurement.RangeDto;
import agh.wfiis.weather.dto.measurement.TimestampDto;
import agh.wfiis.weather.model.measurement.Measurement;
import agh.wfiis.weather.model.measurement.Range;
import agh.wfiis.weather.model.measurement.Timestamp;
import org.springframework.stereotype.Component;

@Component
public class MeasurementMapper {
    private final RangeMapper rangeMapper;
    private final TimestampMapper timestampMapper;

    public MeasurementMapper(RangeMapper rangeMapper, TimestampMapper timestampMapper) {
        this.rangeMapper = rangeMapper;
        this.timestampMapper = timestampMapper;
    }

    public MeasurementDto mapToDto(Measurement measurement) {
        RangeDto range = rangeMapper.mapToDto(measurement.getRange());
        TimestampDto timestamp = timestampMapper.mapEntityToDto(measurement.getTimestamp());
        return MeasurementDto.builder()
                .name(measurement.getName())
                .description(measurement.getDescription())
                .unit(measurement.getUnit())
                .range(range)
                .accuracy(measurement.getAccuracy())
                .validate(measurement.isValidate())
                .errorValue(measurement.getErrorValue())
                .timestamp(timestamp)
                .build();
    }

     public Measurement mapToEntity(MeasurementDto dto) {
        Range range = rangeMapper.mapToEntity(dto.getRange());
        Timestamp timestamp = timestampMapper.mapDtoToEntity(dto.getTimestamp());
        Measurement measurement = new Measurement();

        measurement.setName(dto.getName());
        measurement.setDescription(dto.getDescription());
        measurement.setUnit(dto.getUnit());
        measurement.setRange(range);
        measurement.setAccuracy(dto.getAccuracy());
        measurement.setValidate(dto.isValidate());
        measurement.setErrorValue(dto.getErrorValue());
        measurement.setTimestamp(timestamp);

        return measurement;
     }
}

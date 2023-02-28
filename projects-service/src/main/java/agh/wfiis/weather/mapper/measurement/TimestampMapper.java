package agh.wfiis.weather.mapper.measurement;

import agh.wfiis.weather.common.AggregationType;
import agh.wfiis.weather.common.AlertType;
import agh.wfiis.weather.dto.measurement.TimestampDto;
import agh.wfiis.weather.model.measurement.Timestamp;
import com.google.common.collect.ImmutableBiMap;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TimestampMapper {
    private final ImmutableBiMap<TimestampDto.AlertType, AlertType> mapDtoAlertToEntityAlert = ImmutableBiMap.of(
            TimestampDto.AlertType.EMAIL, AlertType.EMAIL,
            TimestampDto.AlertType.SMS, AlertType.SMS,
            TimestampDto.AlertType.STATUS, AlertType.STATUS
    );
    private final ImmutableBiMap<TimestampDto.AggregationType, AggregationType> mapDtoAggregationToEntityAggregation =
            ImmutableBiMap.of(
                    TimestampDto.AggregationType.MIN, AggregationType.MIN,
                    TimestampDto.AggregationType.TEN_MIN, AggregationType.TEN_MIN,
                    TimestampDto.AggregationType.HOUR, AggregationType.HOUR,
                    TimestampDto.AggregationType.DAY, AggregationType.DAY,
                    TimestampDto.AggregationType.WEEK, AggregationType.WEEK,
                    TimestampDto.AggregationType.MONTH, AggregationType.MONTH
           );

    public TimestampDto mapEntityToDto(Timestamp timestamp) {
        return TimestampDto.builder()
                .maxBreak(timestamp.getMaxBreak())
                .aggregationIntervals(mapEntityAggregationTypes(timestamp.getAggregationIntervals()))
                .alertType(mapDtoAlertToEntityAlert.inverse().get(timestamp.getAlertType()))
                .build();
    }

    public Timestamp mapDtoToEntity(TimestampDto dto) {
        Timestamp timestamp = new Timestamp();

        timestamp.setMaxBreak(dto.getMaxBreak());
        timestamp.setAggregationIntervals(mapDtoAggregationTypes(dto.getAggregationIntervals()));
        timestamp.setAlertType(mapDtoAlertToEntityAlert.get(dto.getAlertType()));

        return timestamp;
    }

    private Set<TimestampDto.AggregationType> mapEntityAggregationTypes(Set<AggregationType> aggregationTypes) {
        return aggregationTypes.stream()
                .map(aggregationType -> mapDtoAggregationToEntityAggregation.inverse().get(aggregationType))
                .collect(Collectors.toSet());
    }

    private Set<AggregationType> mapDtoAggregationTypes(Set<TimestampDto.AggregationType> dtoAggregationTypes) {
        return dtoAggregationTypes.stream()
                .map(mapDtoAggregationToEntityAggregation::get)
                .collect(Collectors.toSet());
    }
}

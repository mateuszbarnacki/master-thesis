package agh.wfiis.weather.mapper.measurement;

import agh.wfiis.weather.dto.measurement.RangeDto;
import agh.wfiis.weather.model.measurement.Range;
import org.springframework.stereotype.Component;

@Component
public class RangeMapper {

    public RangeDto mapToDto(Range range) {
        return RangeDto.builder()
                .min(range.getMin())
                .max(range.getMax())
                .build();
    }

    public Range mapToEntity(RangeDto dto) {
        Range range = new Range();

        range.setMin(dto.getMin());
        range.setMax(dto.getMax());

        return range;
    }
}

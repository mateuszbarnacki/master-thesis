package agh.wfiis.weather.dto.sensor;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "spatialMode")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MobileSensorDto.class, name = "MOBILE_2D"),
        @JsonSubTypes.Type(value = MobileSensorDto.class, name = "MOBILE_3D"),
        @JsonSubTypes.Type(value = StationarySensorDto.class, name = "STATIONARY")
})
public interface SensorDto {
}

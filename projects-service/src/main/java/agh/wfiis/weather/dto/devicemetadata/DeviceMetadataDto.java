package agh.wfiis.weather.dto.devicemetadata;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "spatialMode")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MobileDeviceMetadataDto.class, name = "MOBILE_2D"),
        @JsonSubTypes.Type(value = MobileDeviceMetadataDto.class, name = "MOBILE_3D"),
        @JsonSubTypes.Type(value = StationaryDeviceMetadataDto.class, name = "STATIONARY")
})
public interface DeviceMetadataDto {
}

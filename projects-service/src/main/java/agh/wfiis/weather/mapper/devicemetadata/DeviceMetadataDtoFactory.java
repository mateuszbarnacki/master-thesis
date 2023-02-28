package agh.wfiis.weather.mapper.devicemetadata;

import agh.wfiis.weather.dto.devicemetadata.DeviceMetadataDto;
import agh.wfiis.weather.dto.devicemetadata.MobileDeviceMetadataDto;
import agh.wfiis.weather.dto.devicemetadata.StationaryDeviceMetadataDto;
import agh.wfiis.weather.model.devicemetadata.DeviceMetadata;
import agh.wfiis.weather.model.devicemetadata.MobileDeviceMetadata;
import agh.wfiis.weather.model.devicemetadata.StationaryDeviceMetadata;
import org.springframework.stereotype.Component;

@Component
public class DeviceMetadataDtoFactory {
    public DeviceMetadataDto create(DeviceMetadata metadata) {
        if (metadata instanceof StationaryDeviceMetadata stationaryDeviceMetadata) {
            return buildStationaryDeviceMetadataDto(stationaryDeviceMetadata);
        } else if (metadata instanceof MobileDeviceMetadata mobileDeviceMetadata) {
            return buildMobileDeviceMetadataDto(mobileDeviceMetadata);
        }
        return null;
    }

    private StationaryDeviceMetadataDto buildStationaryDeviceMetadataDto(StationaryDeviceMetadata metadata) {
        return new StationaryDeviceMetadataDto(metadata.getDate());
    }

    private MobileDeviceMetadataDto buildMobileDeviceMetadataDto(MobileDeviceMetadata deviceMetadata) {
        return MobileDeviceMetadataDto.builder()
                .date(deviceMetadata.getDate())
                .latitude(deviceMetadata.getLatitude())
                .longitude(deviceMetadata.getLongitude())
                .altitude(deviceMetadata.getAltitude())
                .speed(deviceMetadata.getSpeed())
                .direction(deviceMetadata.getDirection())
                .build();
    }
}

package agh.wfiis.weather.mapper.devicemetadata;

import agh.wfiis.weather.dto.devicemetadata.DeviceMetadataDto;
import agh.wfiis.weather.dto.devicemetadata.MobileDeviceMetadataDto;
import agh.wfiis.weather.dto.devicemetadata.StationaryDeviceMetadataDto;
import agh.wfiis.weather.model.devicemetadata.DeviceMetadata;
import agh.wfiis.weather.model.devicemetadata.MobileDeviceMetadata;
import agh.wfiis.weather.model.devicemetadata.StationaryDeviceMetadata;
import org.springframework.stereotype.Component;

@Component
public class DeviceMetadataEntityFactory {
    public DeviceMetadata create(DeviceMetadataDto dto) {
        if (dto instanceof StationaryDeviceMetadataDto stationaryDeviceMetadataDto) {
            return buildStationaryDevice(stationaryDeviceMetadataDto);
        } else if (dto instanceof MobileDeviceMetadataDto mobileDeviceMetadataDto) {
            return buildMobileDevice(mobileDeviceMetadataDto);
        }
        return null;
    }

    private StationaryDeviceMetadata buildStationaryDevice(StationaryDeviceMetadataDto dto) {
        StationaryDeviceMetadata deviceMetadata = new StationaryDeviceMetadata();
        deviceMetadata.setDate(dto.date());
        return deviceMetadata;
    }

    private MobileDeviceMetadata buildMobileDevice(MobileDeviceMetadataDto dto) {
        MobileDeviceMetadata deviceMetadata = new MobileDeviceMetadata();

        deviceMetadata.setDate(dto.getDate());
        deviceMetadata.setLatitude(dto.getLatitude());
        deviceMetadata.setLongitude(dto.getLongitude());
        deviceMetadata.setAltitude(dto.getAltitude());
        deviceMetadata.setSpeed(dto.getSpeed());
        deviceMetadata.setDirection(dto.getDirection());

        return deviceMetadata;
    }
}

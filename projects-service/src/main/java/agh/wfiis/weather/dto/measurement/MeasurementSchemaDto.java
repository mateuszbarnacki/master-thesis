package agh.wfiis.weather.dto.measurement;

import agh.wfiis.weather.dto.devicemetadata.DeviceMetadataDto;
import agh.wfiis.weather.dto.devicemetadata.StationaryDeviceMetadataDto;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class MeasurementSchemaDto {
    private final List<MeasurementDto> measurements;
    @NotNull
    private final DeviceMetadataDto deviceMetadata;

    MeasurementSchemaDto(List<MeasurementDto> measurements, DeviceMetadataDto deviceMetadata) {
        this.measurements = measurements;
        this.deviceMetadata = deviceMetadata;
    }

    public static MeasurementSchemaDtoBuilder builder() {
        return new MeasurementSchemaDtoBuilder();
    }

    public List<MeasurementDto> getMeasurements() {
        return measurements;
    }

    public DeviceMetadataDto getDeviceMetadata() {
        return deviceMetadata;
    }

    public static class MeasurementSchemaDtoBuilder {
        private List<MeasurementDto> measurements;
        private DeviceMetadataDto deviceMetadata;

        private MeasurementSchemaDtoBuilder() {
            this.measurements = Collections.emptyList();
            this.deviceMetadata = new StationaryDeviceMetadataDto(Date.from(Instant.now()));
        }

        public MeasurementSchemaDtoBuilder measurements(final List<MeasurementDto> measurements) {
            this.measurements = measurements;
            return this;
        }

        public MeasurementSchemaDtoBuilder deviceMetadata(final DeviceMetadataDto deviceMetadata) {
            this.deviceMetadata = deviceMetadata;
            return this;
        }

        public MeasurementSchemaDto build() {
            return new MeasurementSchemaDto(measurements, deviceMetadata);
        }
    }
}

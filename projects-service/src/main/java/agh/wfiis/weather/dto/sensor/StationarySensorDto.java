package agh.wfiis.weather.dto.sensor;

import agh.wfiis.weather.dto.measurement.MeasurementSchemaDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class StationarySensorDto implements SensorDto {
    @NotBlank(message = "Device identifier is mandatory")
    private final String deviceId;
    private final BigDecimal latitude;
    private final BigDecimal longitude;
    private final BigDecimal altitude;
    @NotNull
    private final MeasurementSchemaDto measurementSchema;

    private StationarySensorDto(StationarySensorDtoBuilder builder) {
        this.deviceId = builder.deviceId;
        this.latitude = builder.latitude;
        this.longitude = builder.longitude;
        this.altitude = builder.altitude;
        this.measurementSchema = builder.measurementSchema;
    }

    public static StationarySensorDtoBuilder builder() {
        return new StationarySensorDtoBuilder();
    }

    public String getDeviceId() {
        return deviceId;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public BigDecimal getAltitude() {
        return altitude;
    }

    public MeasurementSchemaDto getMeasurementSchema() {
        return measurementSchema;
    }

    public static class StationarySensorDtoBuilder {
        private String deviceId;
        private BigDecimal latitude;
        private BigDecimal longitude;
        private BigDecimal altitude;
        private MeasurementSchemaDto measurementSchema;

        public StationarySensorDtoBuilder deviceId(final String deviceId) {
            this.deviceId = deviceId;
            return this;
        }

        public StationarySensorDtoBuilder latitude(final BigDecimal latitude) {
            this.latitude = latitude;
            return this;
        }

        public StationarySensorDtoBuilder longitude(final BigDecimal longitude) {
            this.longitude = longitude;
            return this;
        }

        public StationarySensorDtoBuilder altitude(final BigDecimal altitude) {
            this.altitude = altitude;
            return this;
        }

        public StationarySensorDtoBuilder measurementSchema(final MeasurementSchemaDto measurementSchema) {
            this.measurementSchema = measurementSchema;
            return this;
        }

        public StationarySensorDto build() {
            return new StationarySensorDto(this);
        }
    }
}

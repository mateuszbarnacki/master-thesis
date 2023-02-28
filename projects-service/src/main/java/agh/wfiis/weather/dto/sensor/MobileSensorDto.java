package agh.wfiis.weather.dto.sensor;

import agh.wfiis.weather.dto.measurement.MeasurementSchemaDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MobileSensorDto implements SensorDto {
    @NotBlank(message = "Device identifier is mandatory")
    private final String deviceId;
    @NotNull
    private final MeasurementSchemaDto measurementSchema;

    private MobileSensorDto(MobileSensorDtoBuilder builder) {
        this.deviceId = builder.deviceId;
        this.measurementSchema = builder.measurementSchema;
    }

    public static MobileSensorDtoBuilder builder() {
        return new MobileSensorDtoBuilder();
    }

    public String getDeviceId() {
        return deviceId;
    }

    public MeasurementSchemaDto getMeasurementSchema() {
        return measurementSchema;
    }

    public static class MobileSensorDtoBuilder {
        private String deviceId;
        private MeasurementSchemaDto measurementSchema;

        public MobileSensorDtoBuilder deviceId(final String deviceId) {
            this.deviceId = deviceId;
            return this;
        }

        public MobileSensorDtoBuilder measurementSchema(final MeasurementSchemaDto measurementSchema) {
            this.measurementSchema = measurementSchema;
            return this;
        }

        public MobileSensorDto build() {
            return new MobileSensorDto(this);
        }
    }
}

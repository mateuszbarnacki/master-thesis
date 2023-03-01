package agh.wfiis.weather.dto.measurement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MeasurementDto {
    @NotBlank(message = "Name is mandatory")
    private final String name;
    private final String description;
    @NotBlank(message = "Unit is mandatory")
    private final String unit;
    @NotNull
    private final RangeDto range;
    private final int accuracy;
    private final boolean validate;
    private final int errorValue;
    @NotNull
    private final TimestampDto timestamp;

    MeasurementDto(String name, String description, String unit, RangeDto range, int accuracy, boolean validate, int errorValue, TimestampDto timestamp) {
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.range = range;
        this.accuracy = accuracy;
        this.validate = validate;
        this.errorValue = errorValue;
        this.timestamp = timestamp;
    }

    public static MeasurementDtoBuilder builder() {
        return new MeasurementDtoBuilder();
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getUnit() {
        return unit;
    }

    public RangeDto getRange() {
        return range;
    }

    public int getAccuracy() {
        return accuracy;
    }

    public boolean isValidate() {
        return validate;
    }

    public int getErrorValue() {
        return errorValue;
    }

    public TimestampDto getTimestamp() {
        return timestamp;
    }

    public static class MeasurementDtoBuilder {
        private String name;
        private String description;
        private String unit;
        private RangeDto range;
        private int accuracy;
        private boolean validate;
        private int errorValue;
        private TimestampDto timestamp;

        public MeasurementDtoBuilder name(final String name) {
            this.name = name;
            return this;
        }

        public MeasurementDtoBuilder description(final String description) {
            this.description = description;
            return this;
        }

        public MeasurementDtoBuilder unit(final String unit) {
            this.unit = unit;
            return this;
        }

        public MeasurementDtoBuilder range(final RangeDto range) {
            this.range = range;
            return this;
        }

        public MeasurementDtoBuilder accuracy(final int accuracy) {
            this.accuracy = accuracy;
            return this;
        }

        public MeasurementDtoBuilder validate(final boolean validate) {
            this.validate = validate;
            return this;
        }

        public MeasurementDtoBuilder errorValue(final int errorValue) {
            this.errorValue = errorValue;
            return this;
        }

        public MeasurementDtoBuilder timestamp(final TimestampDto timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public MeasurementDto build() {
            return new MeasurementDto(name, description, unit, range, accuracy, validate, errorValue, timestamp);
        }
    }
}

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

    private MeasurementDto(Builder builder) {
        this.name = builder.name;
        this.description = builder.description;
        this.unit = builder.unit;
        this.range = builder.range;
        this.accuracy = builder.accuracy;
        this.validate = builder.validate;
        this.errorValue = builder.errorValue;
        this.timestamp = builder.timestamp;
    }

    public static Builder builder() {
        return new Builder();
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

    public static class Builder {
        private String name;
        private String description;
        private String unit;
        private RangeDto range;
        private int accuracy;
        private boolean validate;
        private int errorValue;
        private TimestampDto timestamp;

        public Builder name(final String name) {
            this.name = name;
            return this;
        }

        public Builder description(final String description) {
            this.description = description;
            return this;
        }

        public Builder unit(final String unit) {
            this.unit = unit;
            return this;
        }

        public Builder range(final RangeDto range) {
            this.range = range;
            return this;
        }

        public Builder accuracy(final int accuracy) {
            this.accuracy = accuracy;
            return this;
        }

        public Builder validate(final boolean validate) {
            this.validate = validate;
            return this;
        }

        public Builder errorValue(final int errorValue) {
            this.errorValue = errorValue;
            return this;
        }

        public Builder timestamp(final TimestampDto timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public MeasurementDto build() {
            return new MeasurementDto(this);
        }
    }
}

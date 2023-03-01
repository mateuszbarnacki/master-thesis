package agh.wfiis.weather.dto.measurement;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class RangeDto {
    @NotNull
    private final BigDecimal min;
    @NotNull
    private final BigDecimal max;

    RangeDto(BigDecimal min, BigDecimal max) {
        this.min = min;
        this.max = max;
    }

    public static RangeDtoBuilder builder() {
        return new RangeDtoBuilder();
    }

    public BigDecimal getMin() {
        return min;
    }

    public BigDecimal getMax() {
        return max;
    }

    public static class RangeDtoBuilder {
        private BigDecimal min;
        private BigDecimal max;

        private RangeDtoBuilder() {
            this.min = BigDecimal.ZERO;
            this.max = BigDecimal.ZERO;
        }

        public RangeDtoBuilder min(final BigDecimal min) {
            this.min = min;
            return this;
        }

        public RangeDtoBuilder max(final BigDecimal max) {
            this.max = max;
            return this;
        }

        public RangeDto build() {
            return new RangeDto(min, max);
        }
    }
}

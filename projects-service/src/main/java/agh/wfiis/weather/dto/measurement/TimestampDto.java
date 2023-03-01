package agh.wfiis.weather.dto.measurement;

import java.util.Set;

public class TimestampDto {
    private final int maxBreak;
    private final Set<AggregationType> aggregationIntervals;
    private final AlertType alertType;

    TimestampDto(int maxBreak, Set<AggregationType> aggregationIntervals, AlertType alertType) {
        this.maxBreak = maxBreak;
        this.aggregationIntervals = aggregationIntervals;
        this.alertType = alertType;
    }

    public static TimestampDtoBuilder builder() {
        return new TimestampDtoBuilder();
    }

    public int getMaxBreak() {
        return maxBreak;
    }

    public Set<AggregationType> getAggregationIntervals() {
        return aggregationIntervals;
    }

    public AlertType getAlertType() {
        return alertType;
    }

    public static class TimestampDtoBuilder {
        private int maxBreak;
        private Set<AggregationType> aggregationIntervals;
        private AlertType alertType;

        private TimestampDtoBuilder() {
            this.aggregationIntervals = Set.of();
        }

        public TimestampDtoBuilder maxBreak(final int maxBreak) {
            this.maxBreak = maxBreak;
            return this;
        }

        public TimestampDtoBuilder aggregationIntervals(final Set<AggregationType> aggregationIntervals) {
            this.aggregationIntervals = aggregationIntervals;
            return this;
        }

        public TimestampDtoBuilder alertType(final AlertType alertType) {
            this.alertType = alertType;
            return this;
        }

        public TimestampDto build() {
            return new TimestampDto(maxBreak, aggregationIntervals, alertType);
        }
    }

    public enum AlertType {
        EMAIL,
        SMS,
        STATUS
    }

    public enum AggregationType {
        MIN,
        TEN_MIN,
        HOUR,
        DAY,
        WEEK,
        MONTH
    }
}

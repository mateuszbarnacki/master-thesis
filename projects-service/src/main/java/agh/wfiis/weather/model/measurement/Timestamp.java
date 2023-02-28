package agh.wfiis.weather.model.measurement;

import agh.wfiis.weather.common.AggregationType;
import agh.wfiis.weather.common.AlertType;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(value = "timestamp")
public class Timestamp {
    private int maxBreak;
    private Set<AggregationType> aggregationIntervals;
    private AlertType alertType;

    public int getMaxBreak() {
        return maxBreak;
    }

    public void setMaxBreak(int maxBreak) {
        this.maxBreak = maxBreak;
    }

    public Set<AggregationType> getAggregationIntervals() {
        return aggregationIntervals;
    }

    public void setAggregationIntervals(Set<AggregationType> aggregationIntervals) {
        this.aggregationIntervals = aggregationIntervals;
    }

    public AlertType getAlertType() {
        return alertType;
    }

    public void setAlertType(AlertType alertType) {
        this.alertType = alertType;
    }
}


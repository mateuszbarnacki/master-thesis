package agh.wfiis.weather.model.sensor;

import agh.wfiis.weather.model.measurement.MeasurementSchema;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

public class StationarySensor implements Sensor {
    private String deviceId;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal latitude;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal longitude;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal altitude;
    private MeasurementSchema measurementSchema;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public BigDecimal getAltitude() {
        return altitude;
    }

    public void setAltitude(BigDecimal altitude) {
        this.altitude = altitude;
    }

    public MeasurementSchema getMeasurementSchema() {
        return measurementSchema;
    }

    public void setMeasurementSchema(MeasurementSchema measurementSchema) {
        this.measurementSchema = measurementSchema;
    }
}

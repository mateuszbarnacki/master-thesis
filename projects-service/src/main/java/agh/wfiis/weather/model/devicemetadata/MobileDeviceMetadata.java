package agh.wfiis.weather.model.devicemetadata;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;
import java.util.Date;

public class MobileDeviceMetadata implements DeviceMetadata {
    private Date date;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal longitude;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal latitude;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal altitude;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal speed;
    private int direction;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getAltitude() {
        return altitude;
    }

    public void setAltitude(BigDecimal altitude) {
        this.altitude = altitude;
    }

    public BigDecimal getSpeed() {
        return speed;
    }

    public void setSpeed(BigDecimal speed) {
        this.speed = speed;
    }

    public int getDirection() {
        return direction;
    }

    public void setDirection(int direction) {
        this.direction = direction;
    }
}

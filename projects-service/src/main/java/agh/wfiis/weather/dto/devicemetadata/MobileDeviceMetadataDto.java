package agh.wfiis.weather.dto.devicemetadata;

import java.math.BigDecimal;
import java.util.Date;

public class MobileDeviceMetadataDto implements DeviceMetadataDto {
    private final Date date;
    private final BigDecimal longitude;
    private final BigDecimal latitude;
    private final BigDecimal altitude;
    private final BigDecimal speed;
    private final int direction;

    private MobileDeviceMetadataDto(MobileDeviceMetadataDtoBuilder mobileDeviceMetadataDtoBuilder) {
        this.date = mobileDeviceMetadataDtoBuilder.date;
        this.longitude = mobileDeviceMetadataDtoBuilder.longitude;
        this.latitude = mobileDeviceMetadataDtoBuilder.latitude;
        this.altitude = mobileDeviceMetadataDtoBuilder.altitude;
        this.speed = mobileDeviceMetadataDtoBuilder.speed;
        this.direction = mobileDeviceMetadataDtoBuilder.direction;
    }

    public static MobileDeviceMetadataDtoBuilder builder() {
        return new MobileDeviceMetadataDtoBuilder();
    }

    public Date getDate() {
        return date;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getAltitude() {
        return altitude;
    }

    public BigDecimal getSpeed() {
        return speed;
    }

    public int getDirection() {
        return direction;
    }

    public static class MobileDeviceMetadataDtoBuilder {
        private Date date;
        private BigDecimal longitude;
        private BigDecimal latitude;
        private BigDecimal altitude;
        private BigDecimal speed;
        private int direction;

        public MobileDeviceMetadataDtoBuilder date(final Date date) {
            this.date = date;
            return this;
        }

        public MobileDeviceMetadataDtoBuilder longitude(final BigDecimal longitude) {
            this.longitude = longitude;
            return this;
        }

        public MobileDeviceMetadataDtoBuilder latitude(final BigDecimal latitude) {
            this.latitude = latitude;
            return this;
        }

        public MobileDeviceMetadataDtoBuilder altitude(final BigDecimal altitude) {
            this.altitude = altitude;
            return this;
        }

        public MobileDeviceMetadataDtoBuilder speed(final BigDecimal speed) {
            this.speed = speed;
            return this;
        }

        public MobileDeviceMetadataDtoBuilder direction(final int direction) {
            this.direction = direction;
            return this;
        }

        public MobileDeviceMetadataDto build() {
            return new MobileDeviceMetadataDto(this);
        }
    }
}

package agh.wfiis.weather.model.sensor;

import agh.wfiis.weather.model.measurement.MeasurementSchema;

public class MobileSensor implements Sensor {
    private String deviceId;
    private MeasurementSchema measurementSchema;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public MeasurementSchema getMeasurementSchema() {
        return measurementSchema;
    }

    public void setMeasurementSchema(MeasurementSchema measurementSchema) {
        this.measurementSchema = measurementSchema;
    }
}

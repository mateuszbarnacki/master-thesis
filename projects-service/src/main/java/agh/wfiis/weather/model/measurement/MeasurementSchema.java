package agh.wfiis.weather.model.measurement;

import agh.wfiis.weather.model.devicemetadata.DeviceMetadata;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class MeasurementSchema {
    private List<Measurement> measurements;
    private DeviceMetadata deviceMetadata;

    public List<Measurement> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(List<Measurement> measurements) {
        this.measurements = measurements;
    }

    public DeviceMetadata getDeviceMetadata() {
        return deviceMetadata;
    }

    public void setDeviceMetadata(DeviceMetadata deviceMetadata) {
        this.deviceMetadata = deviceMetadata;
    }
}

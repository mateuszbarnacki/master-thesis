package agh.wfiis.weather.model.measurement;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Document(value = "range")
public class Range {
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal min;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal max;

    public BigDecimal getMin() {
        return min;
    }

    public void setMin(BigDecimal min) {
        this.min = min;
    }

    public BigDecimal getMax() {
        return max;
    }

    public void setMax(BigDecimal max) {
        this.max = max;
    }
}

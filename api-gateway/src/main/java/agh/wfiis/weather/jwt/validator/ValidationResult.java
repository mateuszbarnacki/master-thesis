package agh.wfiis.weather.jwt.validator;

import org.apache.logging.log4j.util.Strings;

import java.util.List;

public class ValidationResult {
    private final List<String> errorMessages;

    public ValidationResult(List<String> errorMessages) {
        this.errorMessages = errorMessages;
    }

    public String getErrorMessage() {
        return Strings.join(this.errorMessages, '\n');
    }

    public boolean isValid() {
        return errorMessages.isEmpty();
    }
}

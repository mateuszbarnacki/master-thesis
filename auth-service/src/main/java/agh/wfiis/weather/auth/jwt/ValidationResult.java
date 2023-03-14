package agh.wfiis.weather.auth.jwt;

import java.util.List;

public class ValidationResult {
    private final List<String> messages;

    public ValidationResult(List<String> messages) {
        this.messages = messages;
    }

    public boolean isValid() {
        return this.messages.isEmpty();
    }

    public String getErrorMessage() {
        return String.join("\n", this.messages);
    }
}

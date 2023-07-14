package agh.wfiis.weather.exception;

public class GatewayException extends RuntimeException {
    private final ErrorStatus errorStatus;

    public GatewayException(String message, ErrorStatus errorStatus) {
        super(message);
        this.errorStatus = errorStatus;
    }

    public ErrorStatus getErrorCode() {
        return this.errorStatus;
    }
}

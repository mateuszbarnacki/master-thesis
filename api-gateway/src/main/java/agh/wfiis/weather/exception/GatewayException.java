package agh.wfiis.weather.exception;

public class GatewayException extends RuntimeException {
    private final ErrorCode errorCode;

    public GatewayException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return this.errorCode;
    }
}

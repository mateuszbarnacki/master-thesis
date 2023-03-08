package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class WeatherAppException extends RuntimeException {
    private final ErrorCode errorCode;

    public WeatherAppException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}

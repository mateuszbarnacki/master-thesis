package agh.wfiis.weather.exception.handler;

public record RestErrorDto(String message, ErrorCode errorCode) {
}

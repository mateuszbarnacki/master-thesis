package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class PrivilegeNotFoundException extends WeatherAppException {
    public PrivilegeNotFoundException(String privilege) {
        super(String.format("Could not find privilege with name <%s>", privilege), ErrorCode.NOT_FOUND);
    }
}

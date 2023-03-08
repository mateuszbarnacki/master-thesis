package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class RoleNotFoundException extends WeatherAppException {
    public RoleNotFoundException(String role) {
        super(String.format("Could not find role with name <%s>", role), ErrorCode.NOT_FOUND);
    }
}

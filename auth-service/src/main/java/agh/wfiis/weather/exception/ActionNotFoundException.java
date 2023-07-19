package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class ActionNotFoundException extends WeatherAppException {
    public ActionNotFoundException(String action) {
        super(String.format("Could not find action with name <%s>", action), ErrorCode.NOT_FOUND);
    }
}

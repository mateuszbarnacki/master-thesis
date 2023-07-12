package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class ProjectNotFoundException extends WeatherAppException {
    public ProjectNotFoundException(String project) {
        super(String.format("Could not find project with name <%s>", project), ErrorCode.NOT_FOUND);
    }
}

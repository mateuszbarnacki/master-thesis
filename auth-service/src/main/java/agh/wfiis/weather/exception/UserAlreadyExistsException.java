package agh.wfiis.weather.exception;

import agh.wfiis.weather.exception.handler.ErrorCode;

public class UserAlreadyExistsException extends WeatherAppException {
    public UserAlreadyExistsException() {
        super("User with given username already exists in database!", ErrorCode.BAD_REQUEST);
    }
}

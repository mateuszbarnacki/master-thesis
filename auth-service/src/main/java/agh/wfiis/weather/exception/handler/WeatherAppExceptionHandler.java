package agh.wfiis.weather.exception.handler;

import agh.wfiis.weather.exception.RoleNotFoundException;
import agh.wfiis.weather.exception.WeatherAppException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class WeatherAppExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({RoleNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<RestErrorDto> handleRoleNotFoundException(RoleNotFoundException exception) {
        return new ResponseEntity<>(buildRestErrorDto(exception), HttpStatus.NOT_FOUND);
    }

    private RestErrorDto buildRestErrorDto(WeatherAppException e) {
        return new RestErrorDto(e.getMessage(), e.getErrorCode());
    }
}

package agh.wfiis.weather.jwt.validator;

import org.springframework.security.oauth2.jwt.Jwt;

public interface JwtValidator {
    ValidationResult validate(Jwt jwt);
}

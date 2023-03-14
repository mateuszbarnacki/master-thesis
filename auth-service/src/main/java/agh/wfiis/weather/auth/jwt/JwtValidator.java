package agh.wfiis.weather.auth.jwt;

import org.springframework.security.oauth2.jwt.Jwt;

public interface JwtValidator {
    ValidationResult validate(Jwt jwt);
}

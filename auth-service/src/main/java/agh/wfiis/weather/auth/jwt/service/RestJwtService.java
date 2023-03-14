package agh.wfiis.weather.auth.jwt.service;

import agh.wfiis.weather.auth.jwt.JwtFactory;
import agh.wfiis.weather.auth.jwt.TokenValidator;
import agh.wfiis.weather.auth.jwt.ValidationResult;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class RestJwtService implements JwtService {
    private static final Logger LOGGER = Logger.getLogger(RestJwtService.class.getName());
    private final JwtFactory jwtFactory;
    private final JwtDecoder jwtDecoder;
    private final TokenValidator tokenValidator;

    public RestJwtService(JwtFactory jwtFactory, JwtDecoder jwtDecoder, TokenValidator tokenValidator) {
        this.jwtFactory = jwtFactory;
        this.jwtDecoder = jwtDecoder;
        this.tokenValidator = tokenValidator;
    }

    public String generateToken(Authentication authentication) {
        Jwt jwt = jwtFactory.generate(authentication);
        return jwt.getTokenValue();
    }

    public boolean checkToken(String token) {
        Jwt jwt = jwtDecoder.decode(token);
        ValidationResult validationResult = tokenValidator.validate(jwt);
        return isTokenValid(validationResult);
    }

    private boolean isTokenValid(ValidationResult validationResult) {
        boolean isTokenValid = validationResult.isValid();
        if (!isTokenValid) {
            LOGGER.log(Level.WARNING, "JWT error occurred: {0}", validationResult.getErrorMessage());
        }
        return isTokenValid;
    }
}

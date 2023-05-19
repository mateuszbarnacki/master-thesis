package agh.wfiis.weather.auth.jwt.service;

import agh.wfiis.weather.auth.jwt.JwtFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class RestJwtService implements JwtService {
    private final JwtFactory jwtFactory;

    public RestJwtService(JwtFactory jwtFactory) {
        this.jwtFactory = jwtFactory;
    }

    public String generateToken(Authentication authentication) {
        Jwt jwt = jwtFactory.generate(authentication);
        return jwt.getTokenValue();
    }
}

package agh.wfiis.weather.auth.jwt.service;

import agh.wfiis.weather.auth.dto.AuthenticationResponseDto;
import org.springframework.security.core.Authentication;

public interface JwtService {
    AuthenticationResponseDto createToken(Authentication authentication);
}

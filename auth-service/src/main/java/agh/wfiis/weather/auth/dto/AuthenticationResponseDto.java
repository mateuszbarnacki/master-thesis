package agh.wfiis.weather.auth.dto;

import java.util.Set;

public record AuthenticationResponseDto(String token, String username, Set<String> roles) {
}

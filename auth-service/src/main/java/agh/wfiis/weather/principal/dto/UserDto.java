package agh.wfiis.weather.principal.dto;

import agh.wfiis.weather.config.UserRole;

import java.util.Set;

public record UserDto(String username, String password, Set<UserRole> roles) {
}

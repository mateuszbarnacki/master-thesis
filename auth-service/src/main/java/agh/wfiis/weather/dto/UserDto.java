package agh.wfiis.weather.dto;

import agh.wfiis.weather.common.UserRole;

import java.util.Set;

public record UserDto(String username, String password, Set<UserRole> roles) {
}

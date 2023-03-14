package agh.wfiis.weather.user.dto;

import agh.wfiis.weather.user.common.UserRole;

import java.util.Set;

public record UserDto(String username, String password, Set<UserRole> roles) {
}

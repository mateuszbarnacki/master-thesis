package agh.wfiis.weather.principal.dto;

import agh.wfiis.weather.config.UserRole;

import java.util.Set;

public record UserInfoDto(String username, Set<UserRole> roles, Set<ProjectDto> projects) {
}

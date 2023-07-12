package agh.wfiis.weather.principal.dto;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.project.dto.ProjectDto;

import java.util.Set;

public record UserInfoDto(String username, Set<UserRole> roles, Set<ProjectDto> projects) {
}

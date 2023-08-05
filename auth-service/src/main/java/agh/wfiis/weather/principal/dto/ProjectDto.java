package agh.wfiis.weather.principal.dto;

import agh.wfiis.weather.config.ProjectAction;

import java.util.Set;

public record ProjectDto(Long id, String name, Set<ProjectAction> actions) {
}

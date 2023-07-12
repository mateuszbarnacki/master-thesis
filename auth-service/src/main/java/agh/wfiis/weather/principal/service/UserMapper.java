package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.exception.ProjectNotFoundException;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.exception.RoleNotFoundException;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import agh.wfiis.weather.project.repository.ProjectRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class UserMapper {
    private final RoleRepository roleRepository;
    private final ProjectRepository projectRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Map<String, UserRole> entityRoleToUserRole = Map.of(
            "ADMIN", UserRole.ADMIN,
            "READER", UserRole.READER,
            "WRITER", UserRole.WRITER,
            "EDITOR", UserRole.EDITOR);

    UserMapper(RoleRepository roleRepository, ProjectRepository projectRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.projectRepository = projectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    UserEntity mapUserToEntity(UserDto userDto) {
        UserEntity entity = new UserEntity();

        entity.setUsername(userDto.username());
        entity.setPassword(passwordEncoder.encode(userDto.password()));
        entity.setEmail(userDto.email());
        entity.setDescription(userDto.description());
        entity.addRoles(mapUserRolesToRoleEntities(userDto.roles()));
        entity.addProjects(mapProjectDtosToProjectEntities(userDto.projects()));

        return entity;
    }

    UserInfoDto mapEntityToUserInfoDto(UserEntity entity) {
        Set<UserRole> roles = mapRoleEntitiesToUserRoles(entity.getRoles());
        Set<ProjectDto> projects = mapProjectEntitiesToDtos(entity.getProjects());
        return new UserInfoDto(entity.getUsername(), roles, projects);
    }

    private Set<RoleEntity> mapUserRolesToRoleEntities(Set<UserRole> roles) {
        Set<RoleEntity> roleEntities = new HashSet<>();
        roles.forEach(userRole -> roleEntities.add(mapUserRoleToRoleEntity(userRole)));
        return roleEntities;
    }

    private RoleEntity mapUserRoleToRoleEntity(UserRole userRole) {
        return roleRepository.findByName(userRole.getRole())
                .orElseThrow(() -> new RoleNotFoundException(userRole.getRole()));
    }

    private Set<ProjectEntity> mapProjectDtosToProjectEntities(Set<ProjectDto> projectDtos) {
        Set<ProjectEntity> projectEntities = new HashSet<>();
        projectDtos.forEach(projectDto -> projectEntities.add(mapProjectDtoToProjectEntity(projectDto)));
        return projectEntities;
    }

    private ProjectEntity mapProjectDtoToProjectEntity(ProjectDto dto) {
        return projectRepository.findByName(dto.name())
                .orElseThrow(() -> new ProjectNotFoundException(dto.name()));
    }

    private Set<UserRole> mapRoleEntitiesToUserRoles(Set<RoleEntity> roleEntities) {
        return roleEntities.stream()
                .map(role -> entityRoleToUserRole.get(role.getName()))
                .collect(Collectors.toSet());
    }

    private Set<ProjectDto> mapProjectEntitiesToDtos(Set<ProjectEntity> projectEntities) {
        return projectEntities.stream()
                .map(project -> new ProjectDto(project.getName()))
                .collect(Collectors.toSet());
    }
}

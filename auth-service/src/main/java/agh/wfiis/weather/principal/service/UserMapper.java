package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.UserEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
class UserMapper {
    private final RoleMapper roleMapper;
    private final ProjectMapper projectMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    UserMapper(RoleMapper roleMapper, ProjectMapper projectMapper, BCryptPasswordEncoder passwordEncoder) {
        this.roleMapper = roleMapper;
        this.projectMapper = projectMapper;
        this.passwordEncoder = passwordEncoder;
    }

    UserEntity mapUserDtoToUserEntity(UserDto userDto) {
        UserEntity entity = new UserEntity();

        entity.setUsername(userDto.username());
        entity.setPassword(passwordEncoder.encode(userDto.password()));
        entity.setEmail(userDto.email());
        entity.setDescription(userDto.description());
        entity.addRoles(roleMapper.mapUserRolesToRoleEntities(userDto.roles()));
        entity.addProjects(projectMapper.mapProjectDtosToEntities(userDto.projects(), userDto.username()));

        return entity;
    }

    UserEntity mapUserInfoToUserEntity(UserInfoDto userInfoDto) {
        UserEntity entity = new UserEntity();

        entity.setUsername(userInfoDto.username());
        entity.addRoles(roleMapper.mapUserRolesToRoleEntities(userInfoDto.roles()));
        entity.addProjects(projectMapper.mapProjectDtosToEntities(userInfoDto.projects(), userInfoDto.username()));

        return entity;
    }

    UserInfoDto mapUserEntityToUserInfoDto(UserEntity entity) {
        Set<UserRole> roles = roleMapper.mapRoleEntitiesToUserRoles(entity.getRoles());
        Set<ProjectDto> projects = projectMapper.mapProjectEntitiesToProjectDtos(entity.getProjects());
        return new UserInfoDto(entity.getUsername(), roles, projects);
    }
}

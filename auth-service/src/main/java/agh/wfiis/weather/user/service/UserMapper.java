package agh.wfiis.weather.user.service;

import agh.wfiis.weather.user.common.UserRole;
import agh.wfiis.weather.user.dto.UserDto;
import agh.wfiis.weather.exception.RoleNotFoundException;
import agh.wfiis.weather.user.model.RoleEntity;
import agh.wfiis.weather.user.model.UserEntity;
import agh.wfiis.weather.user.repository.RoleRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
class UserMapper {
    private final RoleRepository roleRepository;

    public UserMapper(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    UserEntity mapDtoToEntity(UserDto userDto) {
        UserEntity entity = new UserEntity();

        entity.setUsername(userDto.username());
        entity.setPassword(userDto.password());
        entity.addRoles(mapUserRolesToRoleEntities(userDto.roles()));

        return entity;
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
}

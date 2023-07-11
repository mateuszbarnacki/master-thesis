package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.exception.RoleNotFoundException;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
class UserMapper {
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserMapper(RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    UserEntity mapDtoToEntity(UserDto userDto) {
        UserEntity entity = new UserEntity();

        entity.setUsername(userDto.username());
        entity.setPassword(passwordEncoder.encode(userDto.password()));
        entity.setEmail(userDto.email());
        entity.setDescription(userDto.description());
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

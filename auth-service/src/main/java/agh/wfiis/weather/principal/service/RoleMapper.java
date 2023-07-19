package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.exception.RoleNotFoundException;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
class RoleMapper {
    private final RoleRepository roleRepository;
    private final Map<String, UserRole> entityRoleToUserRole = Map.of(
            UserRole.ADMIN.getRole(), UserRole.ADMIN,
            UserRole.RESEARCHER.getRole(), UserRole.RESEARCHER,
            UserRole.PROJECT_CREATOR.getRole(), UserRole.PROJECT_CREATOR);

    RoleMapper(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    Set<RoleEntity> mapUserRolesToRoleEntities(Set<UserRole> roles) {
        Set<RoleEntity> roleEntities = new HashSet<>();
        roles.forEach(userRole -> roleEntities.add(mapUserRoleToRoleEntity(userRole)));
        return roleEntities;
    }

    Set<UserRole> mapRoleEntitiesToUserRoles(Set<RoleEntity> roleEntities) {
        return roleEntities.stream()
                .map(role -> entityRoleToUserRole.get(role.getName()))
                .collect(Collectors.toSet());
    }

    private RoleEntity mapUserRoleToRoleEntity(UserRole userRole) {
        return roleRepository.findByName(userRole.getRole())
                .orElseThrow(() -> new RoleNotFoundException(userRole.getRole()));
    }
}

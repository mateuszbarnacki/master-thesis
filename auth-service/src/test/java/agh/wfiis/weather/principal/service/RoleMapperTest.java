package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class RoleMapperTest {
    private static final String RESEARCHER = "RESEARCHER";
    private static final String PROJECT_CREATOR = "PROJECT_CREATOR";
    @Autowired
    private RoleMapper roleMapper;
    @MockBean
    private RoleRepository roleRepository;

    @Test
    void shouldMapUserRolesToUserEntities() {
        RoleEntity researcher = new RoleEntity();
        researcher.setName(RESEARCHER);
        RoleEntity projectCreator = new RoleEntity();
        projectCreator.setName(PROJECT_CREATOR);
        Mockito.when(roleRepository.findByName(RESEARCHER))
                .thenReturn(Optional.of(researcher));
        Mockito.when(roleRepository.findByName(PROJECT_CREATOR))
                .thenReturn(Optional.of(projectCreator));

        Set<UserRole> userRoles = givenSetOfUserRoles();

        Set<RoleEntity> roleEntities = whenMapUserRolesToRoleEntity(userRoles);

        thenCollectionIsNotEmpty(roleEntities);
    }

    @Test
    void shouldMapUserEntitiesToUserRoles() {
        Set<RoleEntity> roleEntities = givenSetOfRoleEntities();

        Set<UserRole> userRoles = whenMapRoleEntitiesToUserRoles(roleEntities);

        thenCollectionIsNotEmpty(userRoles);
    }

    @Test
    void shouldMapToNullBecauseRoleMappingDoesNotExists() {
        Set<RoleEntity> roleEntities = givenSetWithNotExpectedRole();

        Set<UserRole> userRoles = whenMapRoleEntitiesToUserRoles(roleEntities);

        thenCollectionContainsNull(userRoles);
    }

    private Set<UserRole> givenSetOfUserRoles() {
        return Set.of(UserRole.RESEARCHER, UserRole.PROJECT_CREATOR);
    }

    private Set<RoleEntity> givenSetOfRoleEntities() {
        RoleEntity admin = new RoleEntity();
        admin.setName("ADMIN");
        return Set.of(admin);
    }

    private Set<RoleEntity> givenSetWithNotExpectedRole() {
        RoleEntity tester = new RoleEntity();
        tester.setName("TESTER");
        return Set.of(tester);
    }

    private Set<RoleEntity> whenMapUserRolesToRoleEntity(Set<UserRole> userRoles) {
        return roleMapper.mapUserRolesToRoleEntities(userRoles);
    }

    private Set<UserRole> whenMapRoleEntitiesToUserRoles(Set<RoleEntity> roleEntities) {
        return roleMapper.mapRoleEntitiesToUserRoles(roleEntities);
    }

    private void thenCollectionIsNotEmpty(Set<?> collection) {
        Assertions.assertFalse(collection.isEmpty());
    }

    private void thenCollectionContainsNull(Set<?> collection) {
        Assertions.assertTrue(collection.contains(null));
    }
}

package agh.wfiis.weather.config;

import agh.wfiis.weather.exception.PrivilegeNotFoundException;
import agh.wfiis.weather.principal.model.PrivilegeEntity;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.repository.PrivilegeRepository;
import agh.wfiis.weather.principal.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Transactional
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;
    private boolean alreadySetup;

    public SetupDataLoader(RoleRepository roleRepository, PrivilegeRepository privilegeRepository) {
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
        this.alreadySetup = false;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (!alreadySetup) {
            setUp();
            alreadySetup = true;
        }
    }

    private void setUp() {
        setUpPrivileges();
        setUpRoles();
    }

    private void setUpPrivileges() {
        createPrivilegeIfNotExists(Privilege.READ_PROJECT);
        createPrivilegeIfNotExists(Privilege.CREATE_PROJECT);
        createPrivilegeIfNotExists(Privilege.DELETE_PROJECT);
    }

    private void createPrivilegeIfNotExists(Privilege privilege) {
        if (doesPrivilegeNotExist(privilege)) {
            createPrivilege(privilege);
        }
    }

    private boolean doesPrivilegeNotExist(Privilege privilege) {
        return privilegeRepository.findByName(privilege.getName()).isEmpty();
    }

    private void createPrivilege(Privilege privilege) {
        PrivilegeEntity privilegeEntity = new PrivilegeEntity();
        privilegeEntity.setName(privilege.getName());
        privilegeRepository.save(privilegeEntity);
    }

    private void setUpRoles() {
        createRoleIfNotExists(UserRole.ADMIN, Set.of(Privilege.CREATE_PROJECT, Privilege.READ_PROJECT, Privilege.DELETE_PROJECT));
        createRoleIfNotExists(UserRole.READER, Set.of(Privilege.READ_PROJECT));
        createRoleIfNotExists(UserRole.OFFLINE_WRITER, Set.of(Privilege.CREATE_PROJECT, Privilege.DELETE_PROJECT));
    }

    private void createRoleIfNotExists(UserRole role, Set<Privilege> privileges) {
        if (doesRoleNotExist(role)) {
            createRole(role, privileges);
        }
    }

    private boolean doesRoleNotExist(UserRole role) {
        return roleRepository.findByName(role.getRole()).isEmpty();
    }

    private void createRole(UserRole role, Set<Privilege> privileges) {
        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setName(role.getRole());
        roleEntity.addPrivileges(mapPrivilegeToPrivilegeEntities(privileges));
        roleRepository.save(roleEntity);
    }

    private Set<PrivilegeEntity> mapPrivilegeToPrivilegeEntities(Set<Privilege> privileges) {
        Set<PrivilegeEntity> entities = new HashSet<>();
        privileges.forEach(privilege -> entities.add(getPrivilegeEntity(privilege)));
        return entities;
    }

    private PrivilegeEntity getPrivilegeEntity(Privilege privilege) {
        return privilegeRepository.findByName(privilege.getName())
                .orElseThrow(() -> new PrivilegeNotFoundException(privilege.getName()));
    }
}

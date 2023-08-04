package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.model.ProjectEntity;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Set;

@SpringBootTest
class UserMapperTest {
    private static final String PROJECT_CREATOR_ROLE = "PROJECT_CREATOR";
    private static final String RESEARCHER_ROLE = "RESEARCHER";
    private static final String PROJECT_NAME = "TEST_PROJ";
    @Autowired
    private UserMapper userMapper;
    @MockBean
    private RoleMapper roleMapper;
    @MockBean
    private ProjectMapper projectMapper;

    @Test
    void shouldMapUserDtoToUserEntity() {
        RoleEntity projectCreator = new RoleEntity();
        RoleEntity researcher = new RoleEntity();
        ProjectEntity testProj = new ProjectEntity();
        projectCreator.setName(PROJECT_CREATOR_ROLE);
        researcher.setName(RESEARCHER_ROLE);
        testProj.setName(PROJECT_NAME);
        Mockito.when(roleMapper.mapUserRolesToRoleEntities(Set.of(UserRole.PROJECT_CREATOR, UserRole.RESEARCHER)))
                .thenReturn(Set.of(projectCreator, researcher));
        Mockito.when(projectMapper.mapProjectNamesToEntities(Set.of(PROJECT_NAME)))
                .thenReturn(Set.of(testProj));
        UserDto dto = givenUserDto();

        UserEntity entity = whenMapUserDtoToUserEntity(dto);

        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("username", "Test")
                .hasFieldOrPropertyWithValue("email", "testowy@test.com")
                .hasFieldOrPropertyWithValue("description", "User for test purposes")
                .hasFieldOrPropertyWithValue("roles", Set.of(projectCreator, researcher))
                .hasFieldOrPropertyWithValue("projects", Set.of(testProj))
                .hasFieldOrProperty("password");
    }

    @Test
    void shouldMapUserInfoToUserEntity() {
        RoleEntity researcher = new RoleEntity();
        ProjectEntity testProj = new ProjectEntity();
        researcher.setName(RESEARCHER_ROLE);
        testProj.setName(PROJECT_NAME);
        Mockito.when(roleMapper.mapUserRolesToRoleEntities(Set.of(UserRole.RESEARCHER)))
                .thenReturn(Set.of(researcher));
        Mockito.when(projectMapper.mapProjectDtosToEntities(Set.of(new ProjectDto(PROJECT_NAME, Set.of()))))
                .thenReturn(Set.of(testProj));
        UserInfoDto userInfoDto = givenUserInfoDto();

        UserEntity entity = whenMapUserInfoToEntity(userInfoDto);

        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("username", "Tester")
                .hasFieldOrPropertyWithValue("roles", Set.of(researcher))
                .hasFieldOrPropertyWithValue("projects", Set.of(testProj));
    }

    @Test
    void shouldMapUserEntityToUserInfoDto() {
        RoleEntity role = new RoleEntity();
        role.setName(RESEARCHER_ROLE);
        ProjectEntity project = new ProjectEntity();
        project.setName("abc");
        UserEntity entity = new UserEntity();
        entity.setUsername("Dev");
        entity.addRoles(Set.of(role));
        entity.setProjects(Set.of(project));
        ProjectDto abc = new ProjectDto("abc", Set.of());
        Mockito.when(roleMapper.mapRoleEntitiesToUserRoles(Set.of(role)))
                .thenReturn(Set.of(UserRole.RESEARCHER));
        Mockito.when(projectMapper.mapProjectEntitiesToProjectDtos(Set.of(project)))
                .thenReturn(Set.of(abc));

        UserInfoDto userInfoDto = whenMapEntityToUserInfo(entity);

        AssertionsForClassTypes.assertThat(userInfoDto)
                .hasFieldOrPropertyWithValue("username", "Dev")
                .hasFieldOrPropertyWithValue("roles", Set.of(UserRole.RESEARCHER))
                .hasFieldOrPropertyWithValue("projects", Set.of(abc));
    }

    private UserDto givenUserDto() {
        return new UserDto("Test",
                "testowy@test.com",
                "User for test purposes",
                "1243",
                Set.of(UserRole.PROJECT_CREATOR, UserRole.RESEARCHER),
                Set.of(PROJECT_NAME));
    }

    private UserInfoDto givenUserInfoDto() {
        return new UserInfoDto("Tester",
                Set.of(UserRole.RESEARCHER),
                Set.of(new ProjectDto(PROJECT_NAME, Set.of())));
    }

    private UserEntity whenMapUserDtoToUserEntity(UserDto dto) {
        return userMapper.mapUserDtoToUserEntity(dto);
    }

    private UserEntity whenMapUserInfoToEntity(UserInfoDto userInfoDto) {
        return userMapper.mapUserInfoToUserEntity(userInfoDto);
    }

    private UserInfoDto whenMapEntityToUserInfo(UserEntity entity) {
        return userMapper.mapUserEntityToUserInfoDto(entity);
    }
}

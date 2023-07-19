package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.RoleRepository;
import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.model.ProjectEntity;
import agh.wfiis.weather.project.repository.ProjectRepository;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class UserMapperTest {
    private static final String PROJECT_CREATOR_ROLE = "PROJECT_CREATOR";
    private static final String RESEARCHER_ROLE = "RESEARCHER";
    private static final String PROJECT_NAME = "TEST_PROJ";
    @Autowired
    private UserMapper userMapper;
    @MockBean
    private RoleRepository roleRepository;
    @MockBean
    private ProjectRepository projectRepository;

    @Test
    void shouldMapDtoToEntity() {
        RoleEntity projectCreator = new RoleEntity();
        RoleEntity researcher = new RoleEntity();
        ProjectEntity testProj = new ProjectEntity();
        projectCreator.setName(PROJECT_CREATOR_ROLE);
        researcher.setName(RESEARCHER_ROLE);
        testProj.setName(PROJECT_NAME);
        Mockito.when(roleRepository.findByName(PROJECT_CREATOR_ROLE)).thenReturn(Optional.of(projectCreator));
        Mockito.when(roleRepository.findByName(RESEARCHER_ROLE)).thenReturn(Optional.of(researcher));
        Mockito.when(projectRepository.findByName(PROJECT_NAME)).thenReturn(Optional.of(testProj));
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
    void shouldMapUserInfoToEntity() {
        RoleEntity researcher = new RoleEntity();
        ProjectEntity testProj = new ProjectEntity();
        researcher.setName(RESEARCHER_ROLE);
        testProj.setName(PROJECT_NAME);
        Mockito.when(roleRepository.findByName(RESEARCHER_ROLE)).thenReturn(Optional.of(researcher));
        Mockito.when(projectRepository.findByName(PROJECT_NAME)).thenReturn(Optional.of(testProj));
        UserInfoDto userInfoDto = givenUserInfoDto();

        UserEntity entity = whenMapUserInfoToEntity(userInfoDto);

        AssertionsForClassTypes.assertThat(entity)
                .hasFieldOrPropertyWithValue("username", "Tester")
                .hasFieldOrPropertyWithValue("roles", Set.of(researcher))
                .hasFieldOrPropertyWithValue("projects", Set.of(testProj));
    }

    @Test
    void shouldMapEntityToUserInfo() {
        UserEntity entity = givenUserEntity();

        UserInfoDto userInfoDto = whenMapEntityToUserInfo(entity);

        AssertionsForClassTypes.assertThat(userInfoDto)
                .hasFieldOrPropertyWithValue("username", "Dev")
                .hasFieldOrPropertyWithValue("roles", Set.of(UserRole.RESEARCHER))
                .hasFieldOrPropertyWithValue("projects", Set.of(new ProjectDto("abc")));
    }

    private UserDto givenUserDto() {
        return new UserDto("Test",
                "testowy@test.com",
                "User for test purposes",
                "1243",
                Set.of(UserRole.PROJECT_CREATOR, UserRole.RESEARCHER),
                Set.of(new ProjectDto(PROJECT_NAME)));
    }

    private UserInfoDto givenUserInfoDto() {
        return new UserInfoDto("Tester",
                Set.of(UserRole.RESEARCHER),
                Set.of(new ProjectDto(PROJECT_NAME)));
    }

    private UserEntity givenUserEntity() {
        RoleEntity role = new RoleEntity();
        role.setName(RESEARCHER_ROLE);
        ProjectEntity project = new ProjectEntity();
        project.setName("abc");
        UserEntity entity = new UserEntity();
        entity.setUsername("Dev");
        entity.setEmail("dev@devstyle.net");
        entity.setDescription("Test dev account");
        entity.addRoles(Set.of(role));
        entity.addProjects(Set.of(project));
        return entity;
    }

    private UserEntity whenMapUserDtoToUserEntity(UserDto dto) {
        return userMapper.mapUserToEntity(dto);
    }

    private UserEntity whenMapUserInfoToEntity(UserInfoDto userInfoDto) {
        return userMapper.mapUserInfoToEntity(userInfoDto);
    }

    private UserInfoDto whenMapEntityToUserInfo(UserEntity entity) {
        return userMapper.mapEntityToUserInfoDto(entity);
    }
}

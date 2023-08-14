package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@SpringBootTest
class UserRestServiceTest {
    private static final String TEST_USERNAME = "Tester";
    @Autowired
    private UserRestService userRestService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private UserMapper userMapper;

    @Test
    void shouldLoadUserByUsername() {
        UserEntity entity = new UserEntity();
        entity.setUsername(TEST_USERNAME);
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(entity));

        UserDetails user = whenLoadUserByUsername(TEST_USERNAME);

        thenUserContainsExpectedUsername(user);

        Mockito.verify(userRepository).findByUsername(ArgumentMatchers.anyString());
    }

    @Test
    void shouldThrowUsernameNotFoundExceptionBecauseUserDoesNotExist() {
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());

        thenLoadUserByUsernameThrowsUsernameNotFoundException(TEST_USERNAME);

        Mockito.verify(userRepository).findByUsername(ArgumentMatchers.anyString());
    }

    @Test
    void shouldRegisterUser() {
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());
        Mockito.when(userMapper.mapUserDtoToUserEntity(ArgumentMatchers.any(UserDto.class))).thenReturn(new UserEntity());

        UserDto dto = givenUserDto();

        whenRegisterUser(dto);

        Mockito.verify(userRepository).save(ArgumentMatchers.any(UserEntity.class));
    }

    @Test
    void shouldNotRegisterUserAndThrowUserAlreadyExistsException() {
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(new UserEntity()));

        UserDto dto = givenUserDto();

        thenMethodThrowsUserAlreadyExistsException(dto);

        Mockito.verify(userRepository).findByUsername(dto.username());
    }

    @Test
    void shouldUpdateRolesAndProjects() {
        UserEntity mappedUser = new UserEntity();
        mappedUser.setProjects(new HashSet<>());
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.of(new UserEntity()));
        Mockito.when(userMapper.mapUserInfoToUserEntity(ArgumentMatchers.any(UserInfoDto.class)))
                .thenReturn(mappedUser);
        Mockito.when(userRepository.save(ArgumentMatchers.any(UserEntity.class))).thenReturn(new UserEntity());
        UserInfoDto userInfoDto = givenUserInfoDto();

        whenUpdateRolesAndProjects(userInfoDto);
        Mockito.verify(userMapper).mapUserEntityToUserInfoDto(ArgumentMatchers.any(UserEntity.class));
    }

    @Test
    void shouldNotUpdateRolesAndProjectBecauseUserDoesNotExist() {
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());
        UserInfoDto userInfoDto = givenUserInfoDto();

        thenMethodThrowsUsernameNotFoundException(userInfoDto);
    }

    @Test
    void shouldGetUserProject() {
        UserInfoDto userWithOneProject = getUserWithOneProject();
        Mockito.when(userRepository.findByUsername(TEST_USERNAME))
                .thenReturn(Optional.of(new UserEntity()));
        Mockito.when(userMapper.mapUserEntityToUserInfoDto(ArgumentMatchers.any(UserEntity.class)))
                .thenReturn(userWithOneProject);

        Collection<ProjectDto> projects = whenGetUserProjects(TEST_USERNAME, "agh_proj");

        thenProjectCollectionContainsExactlyOneProject(projects);
    }

    @Test
    void shouldNotGetUserProjectBecauseUserDoesNotExist() {
        Mockito.when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(Optional.empty());

        thenGetUserProjectsThrowUsernameNotFoundException(TEST_USERNAME, "agh_proj");
    }

    private UserDto givenUserDto() {
        return new UserDto(TEST_USERNAME,
                "tester@mail.com",
                "Test user",
                "1234",
                Set.of(UserRole.RESEARCHER),
                Set.of("proj_test"));
    }

    private UserInfoDto givenUserInfoDto() {
        return new UserInfoDto(TEST_USERNAME,
                Set.of(UserRole.PROJECT_CREATOR),
                Set.of(new ProjectDto(-2L, "agh", Set.of())));
    }

    private Collection<ProjectDto> whenGetUserProjects(String username, String project) {
        return userRestService.getUserProject(username, project);
    }

    private UserDetails whenLoadUserByUsername(String username) {
        return userRestService.loadUserByUsername(username);
    }

    private void whenRegisterUser(UserDto dto) {
        userRestService.registerUser(dto);
    }

    private UserInfoDto whenUpdateRolesAndProjects(UserInfoDto userInfoDto) {
        return userRestService.updateRolesAndProjects(userInfoDto);
    }

    private void thenUserContainsExpectedUsername(UserDetails userDetails) {
        Assertions.assertEquals(TEST_USERNAME, userDetails.getUsername());
    }

    private void thenLoadUserByUsernameThrowsUsernameNotFoundException(String username) {
        Assertions.assertThrowsExactly(UsernameNotFoundException.class,
                () -> userRestService.loadUserByUsername(username));
    }

    private void thenMethodThrowsUserAlreadyExistsException(UserDto dto) {
        Assertions.assertThrowsExactly(UserAlreadyExistsException.class, () -> userRestService.registerUser(dto));
    }

    private void thenMethodThrowsUsernameNotFoundException(UserInfoDto userInfoDto) {
        Assertions.assertThrowsExactly(UsernameNotFoundException.class,
                () -> userRestService.updateRolesAndProjects(userInfoDto));
    }

    private void thenProjectCollectionContainsExactlyOneProject(Collection<ProjectDto> projects) {
        Assertions.assertEquals(1, projects.size());
    }

    private void thenGetUserProjectsThrowUsernameNotFoundException(String username, String project) {
        Assertions.assertThrowsExactly(UsernameNotFoundException.class,
                () -> userRestService.getUserProject(username, project));
    }

    private UserInfoDto getUserWithOneProject() {
        return new UserInfoDto(TEST_USERNAME,
                Set.of(UserRole.RESEARCHER),
                Set.of(new ProjectDto(-1L, "agh_proj", Set.of())));
    }
}

package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.ProjectEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class UserRestService implements UserService, UserDetailsService {
    private static final String USERNAME_ERROR_MESSAGE = "Could not find user with given username: %s";
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserRestService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USERNAME_ERROR_MESSAGE, username)));
    }

    @Override
    public Collection<UserInfoDto> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(userMapper::mapUserEntityToUserInfoDto)
                .filter(userInfoDto -> !userInfoDto.roles().contains(UserRole.ADMIN))
                .toList();
    }

    @Override
    public Collection<ProjectDto> getUserProject(String username, String project) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        if (userEntity.isEmpty()) {
            throw new UsernameNotFoundException(String.format(USERNAME_ERROR_MESSAGE, username));
        }
        UserInfoDto userInfoDto = userMapper.mapUserEntityToUserInfoDto(userEntity.get());
        if (userInfoDto.roles().contains(UserRole.ADMIN)) {
            return Collections.emptySet();
        }
        return userInfoDto.projects()
                .stream()
                .filter(projectDto -> projectDto.name().equals(project))
                .collect(Collectors.toSet());
    }

    @Override
    public void registerUser(@NotNull UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(userDto.username());
        if (userEntity.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        UserEntity newUser = userMapper.mapUserDtoToUserEntity(userDto);
        userRepository.save(newUser);
    }

    @Override
    public UserInfoDto updateRolesAndProjects(@NotNull UserInfoDto userInfoDto) {
        UserEntity entity = userRepository.findByUsername(userInfoDto.username())
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USERNAME_ERROR_MESSAGE, userInfoDto.username())));
        UserEntity userInfoEntity = userMapper.mapUserInfoToUserEntity(userInfoDto);

        Set<ProjectEntity> userProjects = entity.getProjects();
        Set<ProjectEntity> newProjects = userInfoEntity.getProjects();

        Set<String> userProjectsNames = getProjectsNames(userProjects);
        Set<String> newProjectsNames = getProjectsNames(newProjects);

        Set<ProjectEntity> projectsToRemove = userProjects.stream()
                .filter(userProject -> !newProjectsNames.contains(userProject.getName()))
                .collect(Collectors.toSet());
        Set<ProjectEntity> projectsToAdd = newProjects.stream()
                .filter(project -> !userProjectsNames.contains(project.getName()))
                .collect(Collectors.toSet());

        entity.clearRoles();
        entity.addRoles(userInfoEntity.getRoles());
        entity.removeProjects(projectsToRemove);
        entity.addProjects(projectsToAdd);

        UserEntity newEntity = userRepository.save(entity);

        return userMapper.mapUserEntityToUserInfoDto(newEntity);
    }

    private Set<String> getProjectsNames(Set<ProjectEntity> projectEntities) {
        return projectEntities.stream()
                .map(ProjectEntity::getName)
                .collect(Collectors.toSet());
    }
}

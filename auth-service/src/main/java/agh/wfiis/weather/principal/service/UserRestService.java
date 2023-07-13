package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import agh.wfiis.weather.project.dto.ProjectDto;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
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
                .map(userMapper::mapEntityToUserInfoDto)
                .toList();
    }

    @Override
    public Collection<ProjectDto> getUserProjects(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::mapEntityToUserInfoDto)
                .map(UserInfoDto::projects)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USERNAME_ERROR_MESSAGE, username)));
    }

    @Override
    public void registerUser(@NotNull UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(userDto.username());
        if (userEntity.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        UserEntity newUser = userMapper.mapUserToEntity(userDto);
        userRepository.save(newUser);
    }

    @Override
    public UserInfoDto updateRolesAndProjects(@NotNull UserInfoDto userInfoDto) {
        UserEntity entity = userRepository.findByUsername(userInfoDto.username())
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USERNAME_ERROR_MESSAGE, userInfoDto.username())));
        UserEntity mappedUserInfo = userMapper.mapUserInfoToEntity(userInfoDto);

        entity.clearRoles();
        entity.addRoles(mappedUserInfo.getRoles());
        entity.clearProjects();
        entity.addProjects(mappedUserInfo.getProjects());

        return userMapper.mapEntityToUserInfoDto(entity);
    }
}

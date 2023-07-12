package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@Service
@Transactional
public class UserRestService implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserRestService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Could not find user with given username: %s", username)));
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
    public List<UserInfoDto> getUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(userMapper::mapEntityToUserInfoDto)
                .toList();
    }
}

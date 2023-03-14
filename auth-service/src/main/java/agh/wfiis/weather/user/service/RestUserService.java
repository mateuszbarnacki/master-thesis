package agh.wfiis.weather.user.service;

import agh.wfiis.weather.user.dto.UserDto;
import agh.wfiis.weather.user.model.UserEntity;
import agh.wfiis.weather.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@Transactional
public class RestUserService implements UserService, UserDetailsService {
    private static final Logger LOGGER = Logger.getLogger(RestUserService.class.getName());
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public RestUserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> logUsernameNotFoundException(username));
    }

    @Override
    public void registerUser(UserDto userDto) {
        UserEntity entity = userMapper.mapDtoToEntity(userDto);
        userRepository.save(entity);
    }

    private UsernameNotFoundException logUsernameNotFoundException(String username) {
        LOGGER.log(Level.WARNING, "Could not find user with given username: {}", username);
        throw new UsernameNotFoundException(String.format("Could not find user with given username: %s", username));
    }
}

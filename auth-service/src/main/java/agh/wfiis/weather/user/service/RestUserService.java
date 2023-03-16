package agh.wfiis.weather.user.service;

import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.user.dto.UserDto;
import agh.wfiis.weather.user.model.UserEntity;
import agh.wfiis.weather.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
@Transactional
public class RestUserService implements UserService, UserDetailsService {
    private static final Logger LOGGER = Logger.getLogger(RestUserService.class.getName());
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public RestUserService(UserRepository userRepository, UserMapper userMapper, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> logUsernameNotFoundException(username));
    }

    @Override
    public void registerUser(UserDto userDto) {
        checkIfUserExists(userDto.username());
        UserEntity newUser = userMapper.mapDtoToEntity(userDto);
        //newUser.setPassword(passwordEncoder.encode(userDto.password()));
        userRepository.save(newUser);
    }

    private void checkIfUserExists(String username) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(username);
        if (userEntity.isPresent()) {
            LOGGER.log(Level.SEVERE, "User with given username already exists in database!");
            throw new UserAlreadyExistsException();
        }
    }

    private UsernameNotFoundException logUsernameNotFoundException(String username) {
        LOGGER.log(Level.WARNING, "Could not find user with given username: {}", username);
        throw new UsernameNotFoundException(String.format("Could not find user with given username: %s", username));
    }
}

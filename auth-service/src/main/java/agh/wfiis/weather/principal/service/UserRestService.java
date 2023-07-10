package agh.wfiis.weather.principal.service;

import agh.wfiis.weather.exception.UserAlreadyExistsException;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserRestService implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserRestService(UserRepository userRepository, UserMapper userMapper, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Could not find user with given username: %s", username)));
    }

    @Override
    public void registerUser(UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByUsername(userDto.username());
        if (userEntity.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        UserEntity newUser = userMapper.mapDtoToEntity(userDto);
        newUser.setPassword(passwordEncoder.encode(userDto.password()));
        userRepository.save(newUser);
    }
}

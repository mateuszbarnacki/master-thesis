package agh.wfiis.weather.auth.jwt.service;

import agh.wfiis.weather.auth.dto.AuthenticationResponseDto;
import agh.wfiis.weather.auth.jwt.JwtFactory;
import agh.wfiis.weather.principal.model.RoleEntity;
import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RestJwtService implements JwtService {
    private final JwtFactory jwtFactory;
    private final UserRepository userRepository;

    public RestJwtService(JwtFactory jwtFactory, UserRepository userRepository) {
        this.jwtFactory = jwtFactory;
        this.userRepository = userRepository;
    }

    public AuthenticationResponseDto createToken(Authentication authentication) {
        UserEntity userEntity = getUser(authentication);
        String scope = getAuthorities(userEntity);
        Jwt jwt = jwtFactory.generate(authentication, scope);
        Set<String> roles = getRoles(userEntity);
        return new AuthenticationResponseDto(jwt.getTokenValue(), authentication.getName(), roles);
    }

    private UserEntity getUser(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("Could not find user with given username!"));
    }

    private String getAuthorities(UserEntity userEntity) {
        return Optional.of(userEntity)
                .map(UserEntity::getAuthorities)
                .map(grantedAuthorities -> grantedAuthorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .orElse(StringUtils.EMPTY);
    }

    private Set<String> getRoles(UserEntity userEntity) {
        return Optional.of(userEntity)
                .map(UserEntity::getRoles)
                .stream()
                .flatMap(Collection::stream)
                .map(RoleEntity::getName)
                .collect(Collectors.toSet());
    }
}

package agh.wfiis.weather.auth.jwt;

import agh.wfiis.weather.principal.model.UserEntity;
import agh.wfiis.weather.principal.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Component
public class JwtFactory {
    static final String JWT_ISSUER = "self";
    private final JwtEncoder jwtEncoder;
    private final UserRepository userRepository;

    public JwtFactory(JwtEncoder jwtEncoder, UserRepository userRepository) {
        this.jwtEncoder = jwtEncoder;
        this.userRepository = userRepository;
    }

    public Jwt generate(Authentication authentication) {
        Instant now = Instant.now();
        String scope = getAuthorities(authentication);
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(JWT_ISSUER)
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private String getAuthorities(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(UserEntity::getAuthorities)
                .map(grantedAuthorities -> grantedAuthorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(",")))
                .orElse(StringUtils.EMPTY);
    }
}

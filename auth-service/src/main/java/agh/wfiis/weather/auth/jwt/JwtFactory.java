package agh.wfiis.weather.auth.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class JwtFactory {
    static final String JWT_ISSUER = "self";
    private final JwtEncoder jwtEncoder;

    public JwtFactory(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public Jwt generate(Authentication authentication, String scope) {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(JWT_ISSUER)
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }
}

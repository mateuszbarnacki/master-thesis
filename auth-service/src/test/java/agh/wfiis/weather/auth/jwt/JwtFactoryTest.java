package agh.wfiis.weather.auth.jwt;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

@SpringBootTest
class JwtFactoryTest {
    @Autowired
    private JwtFactory jwtFactory;

    @Test
    void shouldGenerateToken() {
        Authentication testAuthentication = givenTestAuthentication();

        String token = whenGenerateToken(testAuthentication);

        thenTokenIsNotBlank(token);
    }

    private Authentication givenTestAuthentication() {
        return new TestingAuthenticationToken("Test", "Tester");
    }

    private String whenGenerateToken(Authentication testAuthentication) {
        Jwt jwt = jwtFactory.generate(testAuthentication);
        return jwt.getTokenValue();
    }

    private void thenTokenIsNotBlank(String token) {
        Assertions.assertFalse(token.isBlank());
    }
}

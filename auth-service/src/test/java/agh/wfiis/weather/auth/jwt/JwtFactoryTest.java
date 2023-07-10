package agh.wfiis.weather.auth.jwt;

import agh.wfiis.weather.principal.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

@SpringBootTest
class JwtFactoryTest {
    @Autowired
    private JwtFactory jwtFactory;
    @MockBean
    private UserRepository userRepository;

    @Test
    void shouldGenerateToken() {
        Mockito.when(userRepository.findByUsername("Test")).thenReturn(Optional.empty());
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

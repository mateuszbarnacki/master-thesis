package agh.wfiis.weather.auth.jwt;

import agh.wfiis.weather.user.model.UserEntity;
import agh.wfiis.weather.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import static org.mockito.Mockito.when;

@SpringBootTest
class SubjectValidatorTest {
    @InjectMocks
    private SubjectValidator subjectValidator;
    @Mock
    private UserRepository userRepository;
    @Autowired
    private JwtEncoder jwtEncoder;

    @Test
    void shouldReturnValidationResultWithEmptyErrorMessage() {
        Jwt jwt = givenGeneratedJwt();

        ValidationResult validationResult = whenUserExists(jwt);

        thenErrorMessageIsEmpty(validationResult.getErrorMessage());
    }

    @Test
    void shouldReturnValidationResultWithNotEmptyErrorMessage() {
        Jwt jwt = givenGeneratedJwt();

        ValidationResult validationResult = whenUserDoesNotExist(jwt);

        thenErrorMessageIsNotEmpty(validationResult.getErrorMessage());
    }

    private Jwt givenGeneratedJwt() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .subject("Test")
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenUserExists(Jwt jwt) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("Test");
        when(userRepository.findByUsername("Test")).thenReturn(Optional.of(userEntity));

        return subjectValidator.validate(jwt);
    }

    private ValidationResult whenUserDoesNotExist(Jwt jwt) {
        return subjectValidator.validate(jwt);
    }

    private void thenErrorMessageIsEmpty(String errorMessage) {
        Assertions.assertTrue(errorMessage.isEmpty());
    }

    private void thenErrorMessageIsNotEmpty(String errorMessage) {
        Assertions.assertEquals("Given username does not exists!", errorMessage);
    }
}

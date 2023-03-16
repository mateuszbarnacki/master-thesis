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
class TokenValidatorTest {
    @InjectMocks
    private TokenValidator tokenValidator;
    @Mock
    private UserRepository userRepository;
    @Autowired
    private JwtEncoder jwtEncoder;

    @Test
    void shouldBeValidJwt() {
        Jwt jwt = givenValidJwt();

        ValidationResult validationResult = whenValidJwtIsValidated(jwt);

        thenJwtIsValid(validationResult);
    }

    @Test
    void shouldReturnSingleErrorMessage() {
        Jwt jwt = givenInvalidJwtWithInvalidIssuer();

        ValidationResult validationResult = whenJwtWithInvalidIssuerIsValidated(jwt);

        thenValidationResultContainsErrorMessage(validationResult);
    }

    @Test
    void shouldReturnThreeErrorMessagesWithCorrectFormat() {
        Jwt jwt = givenInvalidJwtWithThreeErrors();

        ValidationResult validationResult = whenJwtWithThreeErrorsIsValidated(jwt);

        thenValidationResultContainsThreeErrorMessages(validationResult);
    }

    private Jwt givenValidJwt() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .subject("Test")
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt givenInvalidJwtWithInvalidIssuer() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("test")
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .subject("Test")
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt givenInvalidJwtWithThreeErrors() {
        Instant now = Instant.now().minus(1, ChronoUnit.DAYS);
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("test")
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .subject("Test2")
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt generateJwt(JwtClaimsSet claimsSet) {
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenValidJwtIsValidated(Jwt jwt) {
        return validateWithExistentUser(jwt);
    }

    private ValidationResult whenJwtWithInvalidIssuerIsValidated(Jwt jwt) {
        return validateWithExistentUser(jwt);
    }

    private ValidationResult validateWithExistentUser(Jwt jwt) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("Test");
        when(userRepository.findByUsername("Test")).thenReturn(Optional.of(userEntity));

        return tokenValidator.validate(jwt);
    }

    private ValidationResult whenJwtWithThreeErrorsIsValidated(Jwt jwt) {
        return tokenValidator.validate(jwt);
    }

    private void thenJwtIsValid(ValidationResult validationResult) {
        Assertions.assertTrue(validationResult.isValid());
    }

    private void thenValidationResultContainsErrorMessage(ValidationResult validationResult) {
        Assertions.assertEquals("Invalid JWT issuer!", validationResult.getErrorMessage());
    }

    private void thenValidationResultContainsThreeErrorMessages(ValidationResult validationResult) {
        Assertions.assertEquals("""
                JWT is already expired!
                Given username does not exists!
                Invalid JWT issuer!""", validationResult.getErrorMessage());
    }
}

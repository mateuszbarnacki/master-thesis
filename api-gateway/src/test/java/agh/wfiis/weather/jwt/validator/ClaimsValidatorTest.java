package agh.wfiis.weather.jwt.validator;

import joptsimple.internal.Strings;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@SpringBootTest
class ClaimsValidatorTest {
    private static final String ISSUER = "self";
    private static final String SCOPE_CLAIM = "scope";
    private static final String TEST_PRIVILEGE = "TEST";
    private final ClaimsValidator claimsValidator;
    @Autowired
    private JwtEncoder jwtEncoder;

    ClaimsValidatorTest() {
        this.claimsValidator = new ClaimsValidator();
    }

    @Test
    void shouldReturnValidationResultWithEmptyErrorMessage() {
        Jwt jwt = givenJwtWithNotEmptyScope();

        ValidationResult validationResult = whenJwtIsValidated(jwt);

        thenErrorMessageIsEmpty(validationResult.getErrorMessage());
    }

    @Test
    void shouldReturnValidationResultWithNotEmptyErrorMessage() {
        Jwt jwt = givenJwtWithEmptyScope();

        ValidationResult validationResult = whenJwtIsValidated(jwt);

        thenErrorMessageIsNotEmpty(validationResult.getErrorMessage());
    }

    private Jwt givenJwtWithEmptyScope() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .claim(SCOPE_CLAIM, Strings.EMPTY)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private Jwt givenJwtWithNotEmptyScope() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .claim(SCOPE_CLAIM, TEST_PRIVILEGE)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenJwtIsValidated(Jwt jwt) {
        return claimsValidator.validate(jwt);
    }

    private void thenErrorMessageIsEmpty(String errorMessage) {
        Assertions.assertTrue(errorMessage.isEmpty());
    }

    private void thenErrorMessageIsNotEmpty(String errorMessage) {
        Assertions.assertEquals("Empty privileges list!", errorMessage);
    }
}

package agh.wfiis.weather.auth.jwt;

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
class ExpirationDateValidatorTest {
    private final ExpirationDateValidator expirationDateValidator;
    @Autowired
    private JwtEncoder jwtEncoder;

    ExpirationDateValidatorTest() {
        this.expirationDateValidator = new ExpirationDateValidator();
    }

    @Test
    void shouldReturnValidValidationResult() {
        Jwt jwt = givenJwtWithCorrectExpirationDate();

        ValidationResult validationResult = whenValidate(jwt);

        thenJwtIsValid(validationResult);
    }

    @Test
    void shouldReturnValidationResultWithNotEmptyErrorMessage() {
        Jwt jwt = givenExpiredJwt();

        ValidationResult validationResult = whenValidate(jwt);

        thenValidationResultContainsErrorMessage(validationResult);
    }

    private Jwt givenJwtWithCorrectExpirationDate() {
        Instant now = Instant.now();
        Instant expiredAt = now.plus(10, ChronoUnit.SECONDS);
        return generateJwt(now, expiredAt);
    }

    private Jwt givenExpiredJwt() {
        Instant yesterday = Instant.now().minus(1, ChronoUnit.DAYS);
        Instant expiredAt = yesterday.plus(10, ChronoUnit.SECONDS);
        return generateJwt(yesterday, expiredAt);
    }

    private Jwt generateJwt(Instant issuedAt, Instant expiredAt) {
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuedAt(issuedAt)
                .expiresAt(expiredAt)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenValidate(Jwt jwt) {
        return expirationDateValidator.validate(jwt);
    }

    private void thenJwtIsValid(ValidationResult validationResult) {
        Assertions.assertTrue(validationResult.isValid());
    }

    private void thenValidationResultContainsErrorMessage(ValidationResult validationResult) {
        Assertions.assertEquals("JWT is already expired!", validationResult.getErrorMessage());
    }
}

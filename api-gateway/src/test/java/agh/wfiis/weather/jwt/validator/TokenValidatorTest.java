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
class TokenValidatorTest {
    private static final String VALID_ISSUER = "self";
    private static final String INVALID_ISSUER = "test";
    private static final String CLAIM_SCOPE = "scope";
    private final TokenValidator tokenValidator;
    @Autowired
    private JwtEncoder jwtEncoder;

    TokenValidatorTest() {
        this.tokenValidator = new TokenValidator();
    }

    @Test
    void shouldBeValidJwt() {
        Jwt jwt = givenValidJwt();

        ValidationResult validationResult = whenJwtIsValidated(jwt);

        thenJwtIsValid(validationResult);
    }

    @Test
    void shouldReturnSingleErrorMessage() {
        Jwt jwt = givenInvalidJwtFromYesterday();

        ValidationResult validationResult = whenJwtIsValidated(jwt);

        thenValidationResultContainsErrorMessage(validationResult);
    }

    @Test
    void shouldReturnThreeErrorMessagesWithCorrectFormat() {
        Jwt jwt = givenInvalidJwtWithThreeErrors();

        ValidationResult validationResult = whenJwtIsValidated(jwt);

        thenValidationResultContainsThreeErrorMessages(validationResult);
    }

    private Jwt givenValidJwt() {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(VALID_ISSUER)
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .claim(CLAIM_SCOPE, "TEST")
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt givenInvalidJwtFromYesterday() {
        Instant yesterday = Instant.now().minus(1, ChronoUnit.DAYS);
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(VALID_ISSUER)
                .issuedAt(yesterday)
                .expiresAt(yesterday.plus(10, ChronoUnit.SECONDS))
                .claim(CLAIM_SCOPE, Strings.EMPTY)
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt givenInvalidJwtWithThreeErrors() {
        Instant yesterday = Instant.now().minus(1, ChronoUnit.DAYS);
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(INVALID_ISSUER)
                .issuedAt(yesterday)
                .expiresAt(yesterday.plus(10, ChronoUnit.SECONDS))
                .claim(CLAIM_SCOPE, Strings.EMPTY)
                .build();

        return generateJwt(claimsSet);
    }

    private Jwt generateJwt(JwtClaimsSet claimsSet) {
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenJwtIsValidated(Jwt jwt) {
        return tokenValidator.validate(jwt);
    }

    private void thenJwtIsValid(ValidationResult validationResult) {
        Assertions.assertTrue(validationResult.isValid());
    }

    private void thenValidationResultContainsErrorMessage(ValidationResult validationResult) {
        Assertions.assertEquals("JWT is already expired!", validationResult.getErrorMessage());
    }

    private void thenValidationResultContainsThreeErrorMessages(ValidationResult validationResult) {
        Assertions.assertEquals("""
                JWT is already expired!
                Invalid JWT issuer!""", validationResult.getErrorMessage());
    }
}

package agh.wfiis.weather.jwt.validator;

import org.apache.commons.lang3.StringUtils;
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
class IssuerValidatorTest {
    private final IssuerValidator issuerValidator;
    @Autowired
    private JwtEncoder jwtEncoder;

    IssuerValidatorTest() {
        this.issuerValidator = new IssuerValidator();
    }

    @Test
    void shouldJwtBeValid() {
        Jwt jwt = givenGeneratedJwtWithProvidedIssuer("self");

        ValidationResult validationResult = whenValidateJwt(jwt);

        thenJwtIsValid(validationResult);
    }

    @Test
    void shouldReturnValidationResultWithEmptyErrorMessage() {
        Jwt jwt = givenGeneratedJwtWithProvidedIssuer("self");

        ValidationResult validationResult = whenValidateJwt(jwt);

        thenErrorMessageIsEmpty(validationResult);
    }

    @Test
    void shouldJwtBeInvalid() {
        Jwt jwt = givenGeneratedJwtWithProvidedIssuer("test");

        ValidationResult validationResult = whenValidateJwt(jwt);

        thenJwtIsNotValid(validationResult);
    }

    @Test
    void shouldReturnValidationResultWithNotEmptyErrorMessage() {
        Jwt jwt = givenGeneratedJwtWithProvidedIssuer("test");

        ValidationResult validationResult = whenValidateJwt(jwt);

        thenErrorMessageIsNotEmpty(validationResult);
    }

    private Jwt givenGeneratedJwtWithProvidedIssuer(String issuer) {
        Instant now = Instant.now();
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(issuer)
                .issuedAt(now)
                .expiresAt(now.plus(10, ChronoUnit.SECONDS))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet));
    }

    private ValidationResult whenValidateJwt(Jwt jwt) {
        return issuerValidator.validate(jwt);
    }

    private void thenJwtIsValid(ValidationResult validationResult) {
        Assertions.assertTrue(validationResult.isValid());
    }

    private void thenJwtIsNotValid(ValidationResult validationResult) {
        Assertions.assertFalse(validationResult.isValid());
    }

    private void thenErrorMessageIsEmpty(ValidationResult validationResult) {
        Assertions.assertEquals(StringUtils.EMPTY, validationResult.getErrorMessage());
    }

    private void thenErrorMessageIsNotEmpty(ValidationResult validationResult) {
        Assertions.assertEquals("Invalid JWT issuer!", validationResult.getErrorMessage());
    }
}

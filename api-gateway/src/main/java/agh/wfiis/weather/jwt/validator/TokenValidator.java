package agh.wfiis.weather.jwt.validator;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
public class TokenValidator {
    private final List<JwtValidator> tokenValidators;

    public TokenValidator() {
        this.tokenValidators = List.of(
                new ExpirationDateValidator(),
                new IssuerValidator());
    }

    public TokenValidator(List<JwtValidator> tokenValidators) {
        this.tokenValidators = tokenValidators;
    }

    public ValidationResult validate(Jwt jwt) {
        return new ValidationResult(this.tokenValidators.stream()
                .map(tokenValidator -> tokenValidator.validate(jwt))
                .map(ValidationResult::getErrorMessage)
                .filter(errorMessage -> !errorMessage.isBlank())
                .toList());
    }
}

class ExpirationDateValidator implements JwtValidator {
    private static final String ERROR_MESSAGE = "JWT is already expired!";

    @Override
    public ValidationResult validate(Jwt jwt) {
        Instant expireAt = jwt.getExpiresAt();
        return new ValidationResult(buildErrorMessageList(expireAt));
    }

    private List<String> buildErrorMessageList(Instant expireAt) {
        return Optional.ofNullable(expireAt)
                .filter(expirationTime -> Instant.now().isAfter(expireAt))
                .map(expirationTime -> List.of(ERROR_MESSAGE))
                .orElse(Collections.emptyList());
    }
}

class IssuerValidator implements JwtValidator {
    private static final String ISSUER_CLAIM = "iss";
    private static final String JWT_ISSUER = "self";
    private static final String ERROR_MESSAGE = "Invalid JWT issuer!";

    @Override
    public ValidationResult validate(Jwt jwt) {
        String issuer = jwt.getClaimAsString(ISSUER_CLAIM);
        return new ValidationResult(buildErrorMessageList(issuer));
    }

    private List<String> buildErrorMessageList(String issuer) {
        return JWT_ISSUER.equals(issuer) ? Collections.emptyList() : List.of(ERROR_MESSAGE);
    }
}
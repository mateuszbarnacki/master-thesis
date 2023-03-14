package agh.wfiis.weather.auth.jwt;

import agh.wfiis.weather.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static agh.wfiis.weather.auth.jwt.JwtFactory.JWT_ISSUER;

@Component
public class TokenValidator {
    private final List<JwtValidator> validators;

    @Autowired
    public TokenValidator(UserRepository userRepository) {
        this.validators = List.of(
                new JwtExpirationDateValidator(),
                new JwtSubjectValidator(userRepository),
                new JwtIssuerValidator());
    }

    public TokenValidator(List<JwtValidator> validators) {
        this.validators = validators;
    }

    public ValidationResult validate(Jwt jwt) {
        return new ValidationResult(this.validators.stream()
                .map(validator -> validator.validate(jwt))
                .filter(validationResult -> !validationResult.isValid())
                .map(ValidationResult::getErrorMessage)
                .toList());
    }
}

class JwtExpirationDateValidator implements JwtValidator {
    @Override
    public ValidationResult validate(Jwt jwt) {
        Instant expireAt = jwt.getExpiresAt();
        return new ValidationResult(buildMessageList(expireAt));
    }

    private List<String> buildMessageList(Instant expireAt) {
        return Optional.ofNullable(expireAt)
                .filter(expirationTime -> Instant.now().isAfter(expireAt))
                .map(expirationTime -> List.of("JWT is already expired!"))
                .orElse(Collections.emptyList());
    }
}

class JwtIssuerValidator implements JwtValidator {
    @Override
    public ValidationResult validate(Jwt jwt) {
        String issuer = jwt.getIssuer().toString();
        return new ValidationResult(buildMessageList(issuer));
    }

    private List<String> buildMessageList(String issuer) {
        return JWT_ISSUER.equals(issuer) ? Collections.emptyList() : List.of("Invalid JWT issuer!");
    }
}

class JwtSubjectValidator implements JwtValidator {
    private final UserRepository userRepository;

    public JwtSubjectValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ValidationResult validate(Jwt jwt) {
        String username = jwt.getSubject();
        return new ValidationResult(buildMessageList(username));
    }

    private List<String> buildMessageList(String username) {
        return Optional.ofNullable(username)
                .map(userRepository::findByUsername)
                .filter(Optional::isEmpty)
                .map(user -> List.of("Given username does not exists!"))
                .orElse(Collections.emptyList());
    }
}

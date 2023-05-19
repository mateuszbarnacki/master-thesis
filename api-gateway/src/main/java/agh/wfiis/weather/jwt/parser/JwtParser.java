package agh.wfiis.weather.jwt.parser;

import agh.wfiis.weather.exception.MalformedJwtException;
import agh.wfiis.weather.jwt.validator.TokenValidator;
import agh.wfiis.weather.jwt.validator.ValidationResult;
import joptsimple.internal.Strings;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.Optional;

@Component
public class JwtParser {
    private static final String AUTH_HEADER = "Authorization";
    private final JwtDecoder jwtDecoder;

    public JwtParser(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    public Jwt getJWT(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        String token = getToken(request);
        Jwt jwt = jwtDecoder.decode(token);
        TokenValidator tokenValidator = new TokenValidator();
        ValidationResult validationResult = tokenValidator.validate(jwt);
        if (!validationResult.isValid()) {
            throw new MalformedJwtException(validationResult.getErrorMessage());
        }
        return jwt;
    }

    private String getToken(ServerHttpRequest request) {
        HttpHeaders headers = request.getHeaders();
        String authHeader = headers.getFirst(AUTH_HEADER);
        return Optional.ofNullable(authHeader)
                .map(header -> header.split(" ")[1])
                .orElse(Strings.EMPTY);
    }
}

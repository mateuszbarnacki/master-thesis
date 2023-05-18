package agh.wfiis.weather.jwt;

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
    private static final String SCOPE_CLAIM = "scope";
    private final JwtDecoder jwtDecoder;

    public JwtParser(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    public String getScopeClaim(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        String token = getJWT(request);
        Jwt jwt = jwtDecoder.decode(token);
        return jwt.getClaimAsString(SCOPE_CLAIM);
    }

    private String getJWT(ServerHttpRequest request) {
        HttpHeaders headers = request.getHeaders();
        String authHeader = headers.getFirst(AUTH_HEADER);
        return Optional.ofNullable(authHeader)
                .map(header -> header.split(" ")[1])
                .orElse(Strings.EMPTY);
    }
}

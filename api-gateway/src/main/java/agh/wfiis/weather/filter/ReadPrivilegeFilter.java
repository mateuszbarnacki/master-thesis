package agh.wfiis.weather.filter;

import agh.wfiis.weather.exception.MalformedJwtException;
import agh.wfiis.weather.jwt.parser.JwtParser;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Component
public class ReadPrivilegeFilter implements GatewayFilter {
    private static final String SCOPE_CLAIM = "scope";
    private final JwtDecoder jwtDecoder;

    public ReadPrivilegeFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        try {
            String scope = getScopeClaim(exchange);
            if (!hasReadPrivilege(scope)) {
                return ErrorResponseBuilder.buildInvalidPrivilegeResponse(exchange);
            }
            return chain.filter(exchange);
        } catch (MalformedJwtException | JwtException e) {
            return ErrorResponseBuilder.buildJwtExceptionResponse(exchange, e);
        }
    }

    private String getScopeClaim(ServerWebExchange exchange) {
        JwtParser jwtParser = new JwtParser(this.jwtDecoder);
        Jwt jwt = jwtParser.getJWT(exchange);
        return jwt.getClaimAsString(SCOPE_CLAIM);
    }

    private boolean hasReadPrivilege(String scope) {
        return Arrays.asList(scope.split(",")).contains(Privilege.READ.getName());
    }
}

package agh.wfiis.weather.filter;

import agh.wfiis.weather.exception.MalformedJwtException;
import agh.wfiis.weather.jwt.parser.JwtParser;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
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
            JwtParser jwtParser = new JwtParser(this.jwtDecoder);
            Jwt jwt = jwtParser.getJWT(exchange);
            String scope = jwt.getClaimAsString(SCOPE_CLAIM);
            if (!hasReaderPrivilege(scope)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
            return chain.filter(exchange);
        } catch (MalformedJwtException | JwtException e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            byte[] errorMessage = e.getMessage().getBytes(StandardCharsets.UTF_8);
            DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(errorMessage);
            return exchange.getResponse().writeWith(Flux.just(buffer));
        }
    }

    private boolean hasReaderPrivilege(String scope) {
        return Arrays.asList(scope.split(","))
                .contains(Privilege.READ.getName());
    }
}

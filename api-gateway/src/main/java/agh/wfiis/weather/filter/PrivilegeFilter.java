package agh.wfiis.weather.filter;

import agh.wfiis.weather.exception.MalformedJwtException;
import agh.wfiis.weather.jwt.parser.JwtParser;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
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
public class PrivilegeFilter implements GatewayFilter {
    private static final String SCOPE_CLAIM = "scope";
    private final JwtDecoder jwtDecoder;

    public PrivilegeFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        try {
            String scope = getScopeClaim(exchange);
            if (!hasPrivilege(scope)) {
                return buildInvalidPrivilegeResponse(exchange);
            }
            return chain.filter(exchange);
        } catch (MalformedJwtException | JwtException e) {
            return buildJwtExceptionResponse(exchange, e);
        }
    }

    private String getScopeClaim(ServerWebExchange exchange) {
        JwtParser jwtParser = new JwtParser(this.jwtDecoder);
        Jwt jwt = jwtParser.getJWT(exchange);
        return jwt.getClaimAsString(SCOPE_CLAIM);
    }

    private Mono<Void> buildInvalidPrivilegeResponse(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    private Mono<Void> buildJwtExceptionResponse(ServerWebExchange exchange, RuntimeException e) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBufferFactory bufferFactory = response.bufferFactory();
        DataBuffer buffer = wrapErrorMessage(bufferFactory, e);
        return response.writeWith(Flux.just(buffer));
    }

    private DataBuffer wrapErrorMessage(DataBufferFactory bufferFactory, RuntimeException e) {
        String errorMessage = e.getMessage();
        byte[] errorMessageBytes = errorMessage.getBytes(StandardCharsets.UTF_8);
        return bufferFactory.wrap(errorMessageBytes);
    }

    private boolean hasPrivilege(String scope) {
        return Arrays.stream(scope.split(","))
                .allMatch(value -> Arrays.stream(Privilege.values())
                        .anyMatch(privilege -> privilege.getName().equals(value)));
    }
}

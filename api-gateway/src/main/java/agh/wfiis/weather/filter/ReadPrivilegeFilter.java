package agh.wfiis.weather.filter;

import agh.wfiis.weather.jwt.JwtParser;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Component
public class ReadPrivilegeFilter implements GatewayFilter {
    private final JwtDecoder jwtDecoder;

    public ReadPrivilegeFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        JwtParser jwtParser = new JwtParser(this.jwtDecoder);
        String scope = jwtParser.getScopeClaim(exchange);
        if (!hasReaderPrivilege(scope)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    private boolean hasReaderPrivilege(String scope) {
        return Arrays.asList(scope.split(","))
                .contains(Privilege.READ.getName());
    }
}

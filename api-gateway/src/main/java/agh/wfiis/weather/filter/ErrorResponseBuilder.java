package agh.wfiis.weather.filter;

import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

public class ErrorResponseBuilder {

    public static Mono<Void> buildInvalidPrivilegeResponse(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    public static Mono<Void> buildJwtExceptionResponse(ServerWebExchange exchange, RuntimeException e) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBufferFactory bufferFactory = response.bufferFactory();
        DataBuffer buffer = wrapErrorMessage(bufferFactory, e);
        return response.writeWith(Flux.just(buffer));
    }

    private static DataBuffer wrapErrorMessage(DataBufferFactory bufferFactory, RuntimeException e) {
        String errorMessage = e.getMessage();
        byte[] errorMessageBytes = errorMessage.getBytes(StandardCharsets.UTF_8);
        return bufferFactory.wrap(errorMessageBytes);
    }
}

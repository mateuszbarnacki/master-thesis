package agh.wfiis.weather.filter;

import agh.wfiis.weather.exception.ErrorStatus;
import agh.wfiis.weather.exception.ExceptionDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
        response.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        DataBufferFactory bufferFactory = response.bufferFactory();
        DataBuffer buffer = wrapErrorMessage(bufferFactory, e);
        return response.writeWith(Flux.just(buffer));
    }

    private static DataBuffer wrapErrorMessage(DataBufferFactory bufferFactory, RuntimeException e) {
        ExceptionDetails exceptionDetails = buildExceptionDetails(e);
        ObjectMapper objectMapper = new ObjectMapper();
        byte[] errorMessageBytes;
        try {
            errorMessageBytes = objectMapper.writeValueAsBytes(exceptionDetails);
        } catch (JsonProcessingException jpe) {
            errorMessageBytes = exceptionDetails.toString().getBytes(StandardCharsets.UTF_8);
        }
        return bufferFactory.wrap(errorMessageBytes);
    }

    private static ExceptionDetails buildExceptionDetails(RuntimeException e) {
        return new ExceptionDetails(e.getMessage(), ErrorStatus.UNAUTHORIZED);
    }
}

package agh.wfiis.weather.exception;

public class MalformedJwtException extends GatewayException {
    public MalformedJwtException(String cause) {
        super("JWT error occurred: " + cause, ErrorStatus.UNAUTHORIZED);
    }
}

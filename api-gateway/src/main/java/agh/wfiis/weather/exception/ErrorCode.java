package agh.wfiis.weather.exception;

public enum ErrorCode {
    UNAUTHORIZED(401);

    private final int code;

    ErrorCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }
}

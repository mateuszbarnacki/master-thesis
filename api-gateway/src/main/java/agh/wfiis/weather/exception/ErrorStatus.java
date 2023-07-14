package agh.wfiis.weather.exception;

public enum ErrorStatus {
    UNAUTHORIZED(401);

    private final int code;

    ErrorStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }
}

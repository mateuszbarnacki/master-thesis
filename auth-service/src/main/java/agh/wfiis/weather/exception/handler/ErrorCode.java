package agh.wfiis.weather.exception.handler;

public enum ErrorCode {
    NOT_FOUND(404);
    private final int code;

    ErrorCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}

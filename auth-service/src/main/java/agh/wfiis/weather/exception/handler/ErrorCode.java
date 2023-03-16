package agh.wfiis.weather.exception.handler;

public enum ErrorCode {
    BAD_REQUEST(400),
    NOT_FOUND(404);
    private final int code;

    ErrorCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}

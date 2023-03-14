package agh.wfiis.weather.user.common;

public enum UserRole {
    ADMIN("ADMIN"),
    READER("READER"),
    OFF_LINE_WRITER("OFF_LINE_WRITER");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

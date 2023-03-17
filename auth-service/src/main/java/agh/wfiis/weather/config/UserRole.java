package agh.wfiis.weather.config;

public enum UserRole {
    ADMIN("ADMIN"),
    READER("READER"),
    OFF_LINE_WRITER("OFFLINE_WRITER");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

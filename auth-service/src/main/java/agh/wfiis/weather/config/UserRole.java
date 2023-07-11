package agh.wfiis.weather.config;

public enum UserRole {
    ADMIN("ADMIN"),
    READER("READER"),
    WRITER("WRITER"),
    EDITOR("EDITOR");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

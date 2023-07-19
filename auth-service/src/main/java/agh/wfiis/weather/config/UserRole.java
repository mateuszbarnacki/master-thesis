package agh.wfiis.weather.config;

public enum UserRole {
    ADMIN("ADMIN"),
    PROJECT_CREATOR("PROJECT_CREATOR"),
    RESEARCHER("RESEARCHER");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}

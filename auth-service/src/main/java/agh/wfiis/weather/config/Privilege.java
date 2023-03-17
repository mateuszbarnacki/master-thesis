package agh.wfiis.weather.config;

public enum Privilege {
    READ_PROJECT("READ_PROJECT"),
    CREATE_PROJECT("CREATE_PROJECT"),
    DELETE_PROJECT("DELETE_PROJECT");

    private final String name;

    Privilege(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

package agh.wfiis.weather.filter;

public enum Privilege {
    CREATE_PROJECT("CREATE_PROJECT"),
    READ_PROJECT("READ_PROJECT"),
    ADD_MEASUREMENT("ADD_MEASUREMENT"),
    CREATE_USER("CREATE_USER"),
    UPDATE_PRIVILEGES("UPDATE_PRIVILEGES"),
    DELETE_PROJECT("DELETE_PROJECT");

    private final String name;

    Privilege(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}

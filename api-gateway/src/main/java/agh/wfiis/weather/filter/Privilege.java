package agh.wfiis.weather.filter;

public enum Privilege {
    CREATE("CREATE_PROJECT"),
    READ("READ_PROJECT"),
    DELETE("DELETE_PROJECT");

    private final String name;

    Privilege(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}

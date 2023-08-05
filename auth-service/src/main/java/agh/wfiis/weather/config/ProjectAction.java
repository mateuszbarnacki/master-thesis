package agh.wfiis.weather.config;

public enum ProjectAction {
    ADD_MEASUREMENT("ADD_MEASUREMENT"),
    READ_MEASUREMENT("READ_MEASUREMENT");

    private final String action;

    ProjectAction(String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }

}

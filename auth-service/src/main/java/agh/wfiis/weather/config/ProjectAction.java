package agh.wfiis.weather.config;

public enum ProjectAction {
    ADD_MEASUREMENT("ADD_MEASUREMENT"),
    CLONE_PROJECT("CLONE_PROJECT");

    private final String action;

    ProjectAction(String action) {
        this.action = action;
    }

    public String getAction() {
        return action;
    }

}

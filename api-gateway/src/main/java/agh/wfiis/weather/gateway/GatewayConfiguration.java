package agh.wfiis.weather.gateway;

import agh.wfiis.weather.filter.Privilege;
import agh.wfiis.weather.filter.PrivilegeFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.oauth2.jwt.JwtDecoder;

@Configuration
public class GatewayConfiguration {
    private final JwtDecoder jwtDecoder;

    public GatewayConfiguration(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/projects/**")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.READ_PROJECT, this.jwtDecoder)))
                        .uri("http://sensor-service:13401/projects/"))
                .route(p -> p
                        .path("/projects")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.CREATE_PROJECT, this.jwtDecoder)))
                        .uri("http://sensor-service:13401/projects/"))
                .route(p -> p
                        .path("/projects/**")
                        .and()
                        .method(HttpMethod.DELETE)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.DELETE_PROJECT, this.jwtDecoder)))
                        .uri("http://sensor-service:13401/projects/"))
                .route(p -> p
                        .path("/measurements/upload/**")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.ADD_MEASUREMENT, this.jwtDecoder)))
                        .uri("http://sensor-service:13401/measurements/upload"))
                .route(p -> p
                        .path("/measurements/**")
                        .uri("http://sensor-service:13401/measurements/"))
                .route(p -> p
                        .path("/authentication/**")
                        .uri("http://auth-service:13402/authentication/"))
                .route(p -> p
                        .path("/users")
                        .and()
                        .method(HttpMethod.POST)
                        .uri("http://auth-service:13402/users/"))
                .route(p -> p
                        .path("/users")
                        .and()
                        .method(HttpMethod.PATCH)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES, this.jwtDecoder)))
                        .uri("http://auth-service:13402/users/"))
                .route(p -> p
                        .path("/users/all")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES, this.jwtDecoder)))
                        .uri("http://auth-service:13402/users/all"))
                .route(p -> p
                        .path("/users/{username}/projects")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.READ_PROJECT, this.jwtDecoder)))
                        .uri("http://auth-service:13402/users"))
                .route(p -> p
                        .path("/user-projects")
                        .and()
                        .method(HttpMethod.PATCH)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES, this.jwtDecoder)))
                        .uri("http://auth-service:13402/user-projects"))
                .route(p -> p
                        .path("/user-projects/**")
                        .and()
                        .method(HttpMethod.DELETE)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES, this.jwtDecoder)))
                        .uri("http://auth-service:13402/user-projects/**"))
                .build();
    }
}

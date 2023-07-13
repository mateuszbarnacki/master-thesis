package agh.wfiis.weather.gateway;

import agh.wfiis.weather.filter.Privilege;
import agh.wfiis.weather.filter.PrivilegeFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

@Configuration
public class GatewayConfiguration {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/projects/**")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.READ_PROJECT)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/projects")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.CREATE_PROJECT)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/projects/**")
                        .and()
                        .method(HttpMethod.DELETE)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.DELETE_PROJECT)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/authentication/**")
                        .uri("http://localhost:13402/authentication/"))
                .route(p -> p
                        .path("/user")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.CREATE_USER)))
                        .uri("http://localhost:13402/user/"))
                .route(p -> p
                        .path("/user")
                        .and()
                        .method(HttpMethod.PATCH)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES)))
                        .uri("http://localhost:13402/user/"))
                .route(p -> p
                        .path("/user/all")
                        .and()
                        .method(HttpMethod.GET)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.UPDATE_PRIVILEGES)))
                        .uri("http://localhost:13402/user/all"))
                .route(p -> p
                        .path("/measurements/upload/**")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new PrivilegeFilter(Privilege.ADD_MEASUREMENT)))
                        .uri("http://localhost:13403/measurements/upload"))
                .route(p -> p
                        .path("/measurements")
                        .uri("http://localhost:13403/measurements/"))
                .route(p -> p
                        .path("/results/**")
                        .uri("http://localhost:13404/results/"))
                .build();
    }
}

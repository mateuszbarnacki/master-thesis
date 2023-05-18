package agh.wfiis.weather.configuration;

import agh.wfiis.weather.filter.CreatePrivilegeFilter;
import agh.wfiis.weather.filter.DeletePrivilegeFilter;
import agh.wfiis.weather.filter.ReadPrivilegeFilter;
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
                        .filters(f -> f.filter(new ReadPrivilegeFilter(this.jwtDecoder)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/projects")
                        .and()
                        .method(HttpMethod.POST)
                        .filters(f -> f.filter(new CreatePrivilegeFilter(this.jwtDecoder)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/projects/**")
                        .and()
                        .method(HttpMethod.DELETE)
                        .filters(f -> f.filter(new DeletePrivilegeFilter(this.jwtDecoder)))
                        .uri("http://localhost:13401/projects/"))
                .route(p -> p
                        .path("/authentication/**")
                        .uri("http://localhost:13402/authentication/"))
                .route(p -> p
                        .path("/user")
                        .uri("http://localhost:13402/user/"))
                /*.route(p -> p
                        .path("/measurements/**")
                        .uri("http://measurement-post-service:13403/measurements/"))
                .route(p -> p
                        .path("/results/**")
                        .uri("http://measurement-get-service:13404/results/"))*/
                .build();
    }
}

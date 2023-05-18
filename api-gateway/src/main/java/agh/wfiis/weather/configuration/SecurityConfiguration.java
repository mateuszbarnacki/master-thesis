package agh.wfiis.weather.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class SecurityConfiguration {
    private final RsaKeyProperties keyProperties;

    public SecurityConfiguration(RsaKeyProperties rsaKeyProperties) {
        this.keyProperties = rsaKeyProperties;
    }

    @Bean
    SecurityWebFilterChain buildSecurityWebFilterChain(ServerHttpSecurity http) {
        return http.csrf().disable()
                .cors().disable()
                .httpBasic().disable()
                .authorizeExchange().anyExchange().permitAll().and().build();
    }

    @Bean
    JwtDecoder getJwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(keyProperties.publicKey()).build();
    }
}

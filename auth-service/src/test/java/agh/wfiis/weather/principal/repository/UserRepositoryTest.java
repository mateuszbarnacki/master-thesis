package agh.wfiis.weather.principal.repository;

import agh.wfiis.weather.principal.model.UserEntity;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

@SpringBootTest
@Testcontainers
class UserRepositoryTest {
    @Container
    private static final PostgreSQLContainer<?> container = new PostgreSQLContainer<>("postgres:15.3")
            .withInitScript("init_test_db.sql");
    @Autowired
    private UserRepository userRepository;

    @DynamicPropertySource
    static void overrideProps(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", container::getJdbcUrl);
        registry.add("spring.datasource.username", container::getUsername);
        registry.add("spring.datasource.password", container::getPassword);
    }

    @Test
    void shouldLoadUserByUsername() {
        String username = "Tester";

        Optional<UserEntity> userEntity = whenLoadUserByUsername(username);

        Assertions.assertTrue(userEntity.isPresent());
    }

    @Test
    void shouldThrowExceptionBecauseUserDoesNotExists() {
        String username = "Dev";

        Optional<UserEntity> userEntity = whenLoadUserByUsername(username);

        Assertions.assertTrue(userEntity.isEmpty());
    }

    private Optional<UserEntity> whenLoadUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

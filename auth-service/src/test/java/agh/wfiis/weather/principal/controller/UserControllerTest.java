package agh.wfiis.weather.principal.controller;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.service.user.UserRestService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest({UserController.class})
class UserControllerTest {
    private static ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserRestService userService;

    @BeforeAll
    public static void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    }

    @Test
    @WithMockUser
    void shouldRegisterUser() throws Exception {
        Object user = new Object() {
            private final String username = "Test";
            private final String password = "Test12345";
            private final Set<UserRole> roles = Set.of(UserRole.ADMIN);
        };
        String json = objectMapper.writeValueAsString(user);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/users")
                .with(csrf())
                .characterEncoding(StandardCharsets.UTF_8)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isCreated());

        verify(userService).registerUser(any(UserDto.class));
    }
}

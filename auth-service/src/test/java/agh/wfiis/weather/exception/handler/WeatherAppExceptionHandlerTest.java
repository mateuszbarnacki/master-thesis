package agh.wfiis.weather.exception.handler;

import agh.wfiis.weather.exception.DummyController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class WeatherAppExceptionHandlerTest {
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(new DummyController())
                .setControllerAdvice(new WeatherAppExceptionHandler())
                .build();
    }

    @Test
    @WithMockUser
    void shouldThrowRoleNotFoundException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/error/role-not-found"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Could not find role with name <KLAUN>"))
                .andExpect(jsonPath("$.errorCode").value("NOT_FOUND"));
    }

    @Test
    @WithMockUser
    void shouldThrowPrivilegeNotFoundException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/error/privilege-not-found"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("Could not find privilege with name <TEST>"))
                .andExpect(jsonPath("$.errorCode").value("NOT_FOUND"));
    }

    @Test
    @WithMockUser
    void shouldThrowUserAlreadyExistsException() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/error/user-already-exists"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").value("User with given username already exists in database!"))
                .andExpect(jsonPath("$.errorCode").value("BAD_REQUEST"));
    }
}

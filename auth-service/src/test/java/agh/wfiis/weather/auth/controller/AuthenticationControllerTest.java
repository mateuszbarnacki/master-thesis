package agh.wfiis.weather.auth.controller;

import agh.wfiis.weather.auth.jwt.service.JwtService;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@WebMvcTest({AuthenticationController.class})
class AuthenticationControllerTest {
    private final ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private JwtService jwtService;
    @MockBean
    private AuthenticationManager authenticationManager;

    AuthenticationControllerTest() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    }

    @Test
    @WithMockUser
    void shouldCreateToken() throws Exception {
        Object authenticationDto = new Object() {
            private final String username = "test";
            private final String password = "test1234";
        };
        String jsonAuthenticationDto = objectMapper.writeValueAsString(authenticationDto);

        when(authenticationManager.authenticate(any()))
                .thenReturn(new UsernamePasswordAuthenticationToken("test", "test1234"));
        when(jwtService.generateToken(any())).thenReturn("Test.Token.1234");
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/authentication/auth")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
                .with(csrf())
                .content(jsonAuthenticationDto);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").value("Test.Token.1234"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("test"));

        verify(authenticationManager).authenticate(any());
        verify(jwtService).generateToken(any());
    }

    @Test
    @WithMockUser
    void shouldNotCreateToken() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/authentication/auth").with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}

package agh.wfiis.weather.principal.controller;

import agh.wfiis.weather.config.UserRole;
import agh.wfiis.weather.principal.dto.UserDto;
import agh.wfiis.weather.principal.dto.UserInfoDto;
import agh.wfiis.weather.principal.service.UserRestService;
import agh.wfiis.weather.project.dto.ProjectDto;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;

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
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .characterEncoding(StandardCharsets.UTF_8)
                .content(json)
                .contentType(MediaType.APPLICATION_JSON_VALUE);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isCreated());

        Mockito.verify(userService).registerUser(ArgumentMatchers.any(UserDto.class));
    }

    @Test
    @WithMockUser
    void shouldGetUsers() throws Exception {
        Mockito.when(userService.getUsers())
                .thenReturn(List.of(new UserInfoDto("test", Set.of(), Set.of())));
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/all");

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").value("test"));

        Mockito.verify(userService).getUsers();
    }

    @Test
    @WithMockUser
    void shouldUpdateRolesAndProjects() throws Exception {
        Object userInfoDto = new Object() {
            private final String username = "Dev";
            private final Set<UserRole> roles = Set.of(UserRole.PROJECT_CREATOR);
            private final Set<ProjectDto> projects = Set.of(new ProjectDto("wfiis_proj"));
        };
        String json = objectMapper.writeValueAsString(userInfoDto);

        Mockito.when(userService.updateRolesAndProjects(ArgumentMatchers.any(UserInfoDto.class)))
                .thenReturn(new UserInfoDto("Dev", Set.of(UserRole.PROJECT_CREATOR), Set.of(new ProjectDto("wfiis_proj"))));

        RequestBuilder requestBuilder = MockMvcRequestBuilders.patch("/users")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .characterEncoding(StandardCharsets.UTF_8);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("Dev"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.roles").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.projects").isArray());

        Mockito.verify(userService).updateRolesAndProjects(ArgumentMatchers.any(UserInfoDto.class));
    }

    @Test
    @WithMockUser
    void shouldGetUserProjects() throws Exception {
        String username = "Tester";
        Mockito.when(userService.getUserProjects(username))
                .thenReturn(Set.of(new ProjectDto("proj_test")));
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/users/projects/{username}", username);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("proj_test"));

        Mockito.verify(userService).getUserProjects(ArgumentMatchers.anyString());
    }
}

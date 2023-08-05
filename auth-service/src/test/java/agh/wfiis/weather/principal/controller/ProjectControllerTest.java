package agh.wfiis.weather.principal.controller;

import agh.wfiis.weather.config.ProjectAction;
import agh.wfiis.weather.principal.dto.ProjectActionsDto;
import agh.wfiis.weather.principal.dto.ProjectDto;
import agh.wfiis.weather.principal.service.ProjectRestService;
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
import java.util.Set;

@WebMvcTest({ProjectController.class})
class ProjectControllerTest {
    private static ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ProjectRestService projectService;

    @BeforeAll
    public static void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    }

    @Test
    @WithMockUser
    void shouldUpdateActions() throws Exception {
        Object projectActionsDto = new Object() {
            private final Set<ProjectDto> projects = Set.of(new ProjectDto(-1L, "EMPTY", Set.of()));
        };
        String json = objectMapper.writeValueAsString(projectActionsDto);

        ProjectDto project = new ProjectDto(-1L, "ITest", Set.of(ProjectAction.ADD_MEASUREMENT));
        ProjectActionsDto projectActions = new ProjectActionsDto(Set.of(project));
        Mockito.when(projectService.updateActions(ArgumentMatchers.any(ProjectActionsDto.class)))
                .thenReturn(projectActions);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.patch("/user-projects")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .characterEncoding(StandardCharsets.UTF_8);

        mockMvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.projects").isArray());

        Mockito.verify(projectService).updateActions(ArgumentMatchers.any(ProjectActionsDto.class));
    }
}

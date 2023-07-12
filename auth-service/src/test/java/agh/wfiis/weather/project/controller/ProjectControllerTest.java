package agh.wfiis.weather.project.controller;

import agh.wfiis.weather.project.dto.ProjectDto;
import agh.wfiis.weather.project.service.ProjectService;
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

@WebMvcTest({ProjectController.class})
class ProjectControllerTest {
    private static ObjectMapper objectMapper;
    @MockBean
    private ProjectService projectService;
    @Autowired
    private MockMvc mvc;

    @BeforeAll
    static void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    }

    @Test
    @WithMockUser
    void shouldGetProjects() throws Exception {
        Mockito.when(projectService.getProjects())
                .thenReturn(List.of(new ProjectDto("Test1"), new ProjectDto("Project2")));
        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/projects/all");

        mvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Test1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Project2"));

        Mockito.verify(projectService).getProjects();
    }

    @Test
    @WithMockUser
    void shouldAddProject() throws Exception {
        Object dtoObject = new Object(){
            private final String name = "AddTest";
        };
        String json = objectMapper.writeValueAsString(dtoObject);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/projects")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .content(json)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8);

        mvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isCreated());

        Mockito.verify(projectService).addProject(ArgumentMatchers.any(ProjectDto.class));
    }
}

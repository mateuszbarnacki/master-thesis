package agh.wfiis.weather.controller;

import agh.wfiis.weather.dto.ProjectDto;
import agh.wfiis.weather.dto.sensor.SensorDto;
import agh.wfiis.weather.service.impl.ProjectServiceImpl;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProjectResourceTest {
    private MockMvc mvc;
    @MockBean
    private ProjectServiceImpl service;

    @BeforeEach
    public void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(new ProjectResource(service)).build();
    }

    @Test
    void shouldReturnProject() throws Exception {
        String name = "test";
        when(service.getProject(name))
                .thenReturn(ProjectDto.builder().name("test").acronym("tmp").build());

        mvc.perform(MockMvcRequestBuilders.get("/projects/{name}", name)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(name))
                .andExpect(MockMvcResultMatchers.jsonPath("$.acronym").value("tmp"));
    }

    @Test
    void shouldReturnAllProjects() throws Exception {
        when(service.getProjects())
                .thenReturn(List.of(ProjectDto.builder().name("test").acronym("tmp").build()));

        mvc.perform(MockMvcRequestBuilders.get("/projects/all"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.jsonPath("$.size()", Matchers.is(1)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("test"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].acronym").value("tmp"));
    }

    @Test
    void shouldAddResult() throws Exception {
        Object object = new Object() {
            private final String acronym = "tmp";
            private final String name = "test";
            private final String description = "Lorem ipsum";
            private final ProjectDto.TimeMode timeMode = ProjectDto.TimeMode.OFFLINE;
            private final ProjectDto.SpatialMode spatialMode = ProjectDto.SpatialMode.STATIONARY;
            private final ProjectDto.MeasurementMode measurementMode = ProjectDto.MeasurementMode.SINGLE;
            private final List<SensorDto> sensors = Collections.emptyList();
        };

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String jsonObject = objectMapper.writeValueAsString(object);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/projects")
                .characterEncoding(StandardCharsets.UTF_8)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(jsonObject);

        mvc.perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isCreated());

        verify(service).addProject(any(ProjectDto.class));
    }

    @Test
    void shouldReturn400StatusCode() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/projects")
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void emptyTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/projects")
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldDeleteProject() throws Exception {
        mvc.perform(MockMvcRequestBuilders.delete("/projects/{name}", "test"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        verify(service).deleteProject(anyString());
    }
}

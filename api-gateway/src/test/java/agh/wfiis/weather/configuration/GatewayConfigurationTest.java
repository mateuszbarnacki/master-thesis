package agh.wfiis.weather.configuration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.test.web.reactive.server.WebTestClient;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.stubFor;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
properties = {"uri.httpUri=http://localhost:${wiremock.server.port}"})
@AutoConfigureWireMock(port = 0)
class GatewayConfigurationTest {

    @Autowired
    private WebTestClient webClient;

    @Test
    void shouldRouteToProjectsService() {
        stubFor(get(urlEqualTo("/projects/all"))
                .willReturn(aResponse()
                        .withHeader("Content-Type", "application/json")));

        webClient.get()
                .uri("/projects/all")
                .exchange()
                .expectStatus().isOk();
    }
}

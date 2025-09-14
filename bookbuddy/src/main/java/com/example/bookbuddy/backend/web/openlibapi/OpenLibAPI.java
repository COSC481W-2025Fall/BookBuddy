package com.example.bookbuddy.backend.web.openlibapi;

import com.example.bookbuddy.backend.web.search.JsonReturn;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/openlib")
public class OpenLibAPI {
    // Create the base String and http client
    private static final String baseUrl = "https://openlibrary.org/search.json?";
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public OpenLibAPI() {
        httpClient = HttpClient.newHttpClient();
        objectMapper = new ObjectMapper();
    }

    // Pull search query from frontend, modify into new URL, pull data from API,
    // and return json to frontend
    @GetMapping("/search/{query}")
    public JsonReturn search(@PathVariable("query") String query) {
        String q = query.replaceAll("\\s+", "+").trim();
        String fullUrl = baseUrl + "q=" + q;

        // Make http request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fullUrl))
                .GET()
                .build();

        // Get response from API and return JSON response to frontend. Catch errors and throw RuntimeException
        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                throw new RuntimeException("API request failed: " + response.statusCode());
            }
            return objectMapper.readValue(response.body(), JsonReturn.class);
        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Fetch or Parse Failed", e);
        }
    }
}
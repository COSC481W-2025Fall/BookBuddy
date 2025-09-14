package com.example.bookbuddy.backend.web.openlibapi;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.bookbuddy.backend.web.search.JsonReturn;
import Java.util.List;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class OpenLibAPI {
    // Create the base String and http client
    private static String baseUrl = "https://openlibrary.org/search.json?";
    private HttpClient httpClient;

    // Pull search query from frontend, modify into new URL, pull data from API,
    // and return json to frontend
    @RequestParam("/search/{query}")
    public JsonReturn search(@PathVariable String query) {
        String q = query.replaceAll("\\s+", "+").trim();
        String fullUrl = baseUrl + "q=" + q;

        // Make http request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fullUrl))
                .GET()
                .build();

        // Get response from API and return JSON response to frontend
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        return objectMapper.readValue(response.body(), JsonReturn.class);
    }
}
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.web.bind.annotation.*;
//This file is the actual google books api search that takes whatever the user input in the search
//and retrieves the top 30 results sorted by relevance
@RestController
@RequestMapping("/googlebooks")
public class GoogleBooksAPI {
    //The API Key and the base api url that does the actual request
    private static final String API_KEY = "AIzaSyDOSZtEaGtDya1YYpfo8XBumXN4FJCaNWE";
    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GoogleBooksAPI() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping("/search/{query}")
    public String search(@PathVariable("query") String query) {
        String q = query.replaceAll("\\s+", "+").trim();
        String fullUrl = BASE_URL + q + "&maxResults=30&orderBy=relevance&key=" + API_KEY;

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new RuntimeException("API request failed: " + response.statusCode());
            }

            return response.body(); // raw JSON to frontend
            // OR: return objectMapper.readValue(response.body(), JsonReturn.class);
        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Fetch or Parse Failed", e);
        }
    }
}


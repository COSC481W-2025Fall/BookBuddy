package com.example.bookbuddy.backend.web.googlebooksapi;

import com.example.bookbuddy.backend.web.search.Doc;
import com.example.bookbuddy.backend.web.search.JsonReturn;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/googlebooks")
public class GoogleBooksAPI {
    private static final String API_KEY = "MUST_USE_API_KEY";
    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GoogleBooksAPI() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping("/search/{query}")
    public JsonReturn search(@PathVariable("query") String query) {
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

            JsonNode root = objectMapper.readTree(response.body());
            List<Doc> docs = new ArrayList<>();

            if (root.has("items")) {
                for (JsonNode item : root.get("items")) {
                    JsonNode info = item.get("volumeInfo");

                    String bookname = info.has("title") ? info.get("title").asText() : "Unknown";
                    String author = (info.has("authors") && info.get("authors").isArray())
                            ? info.get("authors").get(0).asText() : "Unknown";
                    String isbn = null;
                    if (info.has("industryIdentifiers") && info.get("industryIdentifiers").isArray()) {
                        String isbn10 = null;
                        for (JsonNode id : info.get("industryIdentifiers")) {
                            if (id.has("type") && "ISBN_13".equals(id.get("type").asText())) {
                                isbn = id.get("identifier").asText();
                                break; // found ISBN-13, stop immediately
                            } else if (id.has("type") && "ISBN_10".equals(id.get("type").asText())) {
                                isbn10 = id.get("identifier").asText();
                            }
                        }
                        if (isbn == null && isbn10 != null) {
                            isbn = isbn10; // fallback to ISBN-10
                        }
                    }

// If still null → skip this book (no valid ISBN)
                    if (isbn == null) {
                        continue;
                    }
                    String genre = (info.has("categories") && info.get("categories").isArray())
                            ? info.get("categories").get(0).asText() : "Unknown";

                    docs.add(new Doc(bookname, author, isbn, genre));
                }
            }

            JsonReturn result = new JsonReturn();
            result.setNumFound(docs.size());
            result.setDocs(docs);

            return result;

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Fetch or Parse Failed", e);
        }
    }
}
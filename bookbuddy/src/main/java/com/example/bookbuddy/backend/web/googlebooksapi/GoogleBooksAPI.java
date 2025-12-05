package com.example.bookbuddy.backend.web.googlebooksapi;

import com.example.bookbuddy.backend.web.search.Doc;
import com.example.bookbuddy.backend.web.search.JsonReturn;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;


import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/googlebooks")
public class GoogleBooksAPI {
    @Value("${book.api.key}") //comment this line out and use actual api key for local useage
    private String API_KEY; //make this = "the api key" for local useage
    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public GoogleBooksAPI() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    // Accept query parameter: /googlebooks/search?q=the%20hobbit
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam("q") String query) {
        String encoded = URLEncoder.encode(query.trim(), StandardCharsets.UTF_8);
        String fullUrl = BASE_URL + encoded + "&maxResults=30&orderBy=relevance"; //&key=" + API_KEY;

        try {
            System.out.println("🔑 Google Books API URL: " + fullUrl);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Google API Status: " + response.statusCode());
            System.out.println("Raw Google API Response: " + response.body());

            if (response.statusCode() != 200) {
                // Propagate Google’s error so the browser shows the real cause (e.g., 400/403/quota/etc.)
                return ResponseEntity.status(response.statusCode()).body(response.body());
            }

            JsonNode root = objectMapper.readTree(response.body());
            List<Doc> docs = new ArrayList<>();

            if (root.has("items")) {
                for (JsonNode item : root.get("items")) {
                    JsonNode info = item.get("volumeInfo");
                    if (info == null) continue;

                    String bookname = info.has("title") ? info.get("title").asText() : "Unknown";

                    String author = "Unknown";
                    if (info.has("authors") && info.get("authors").isArray() && info.get("authors").size() > 0) {
                        author = info.get("authors").get(0).asText();
                    }

                    String isbn = null;
                    if (info.has("industryIdentifiers") && info.get("industryIdentifiers").isArray()) {
                        String isbn10 = null;
                        for (JsonNode id : info.get("industryIdentifiers")) {
                            if (id.has("type") && "ISBN_13".equals(id.get("type").asText())) {
                                isbn = id.get("identifier").asText();
                                break;
                            } else if (id.has("type") && "ISBN_10".equals(id.get("type").asText())) {
                                isbn10 = id.get("identifier").asText();
                            }
                        }
                        if (isbn == null && isbn10 != null) {
                            isbn = isbn10;
                        }
                    }

                    if (isbn == null) {
                        continue;
                    }

                    String genre = "Unknown";
                    if (info.has("categories") && info.get("categories").isArray() && info.get("categories").size() > 0) {
                        genre = info.get("categories").get(0).asText();
                    }
                    String coverid = item.has("id") ? item.get("id").asText() : "Unknown";

                    String publication = info.has("publishedDate")
                            ? info.get("publishedDate").asText()
                            : "Unknown";

                    int pagecount = info.has("pageCount")
                            ? info.get("pageCount").asInt()
                            : 0;

                    String description = info.has("description")
                            ? info.get("description").asText()
                            : "No description available";

                    docs.add(new Doc(isbn, bookname, author, genre, coverid, description, pagecount, publication));
                }
            }

            JsonReturn result = new JsonReturn();
            result.setNum_found(docs.size());
            result.setDocs(docs);

            return ResponseEntity.ok(result);

        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body("Failed to fetch from Google Books API.");
        }
    }

    // Backward-compat route: /googlebooks/search/the%20hobbit
    // Delegates to the query-param method so existing frontend calls won't 500.
    @GetMapping("/search/{query}")
    public ResponseEntity<?> searchPath(@PathVariable("query") String query) {
        return search(query);
    }
}

package com.example.bookbuddy.backend.web.googlebooksapi;

import com.example.bookbuddy.backend.web.search.Doc;
import com.example.bookbuddy.backend.web.search.JsonReturn;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.http.ResponseEntity;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

//Test written mainly by ChatGPT
//Mocks the API call and returns the fake json and compares it
class GoogleBooksAPITest {

    private GoogleBooksAPI googleBooksAPI;
    private HttpClient mockHttpClient;
    private HttpResponse<String> mockHttpResponse;
    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() throws Exception {
        googleBooksAPI = new GoogleBooksAPI();

        // Use reflection to inject mocks
        mockHttpClient = mock(HttpClient.class);
        mockHttpResponse = mock(HttpResponse.class);

        // Inject mock HttpClient into the GoogleBooksAPI instance
        var httpClientField = GoogleBooksAPI.class.getDeclaredField("httpClient");
        httpClientField.setAccessible(true);
        httpClientField.set(googleBooksAPI, mockHttpClient);

        // Also inject API key for test
        var apiKeyField = GoogleBooksAPI.class.getDeclaredField("API_KEY");
        apiKeyField.setAccessible(true);
        apiKeyField.set(googleBooksAPI, "fake-api-key");
    }

    @Test
    void search_ReturnsParsedBooks_WhenGoogleReturnsValidJson() throws Exception {
        // Given a fake JSON response from Google Books API
        String fakeJson = """
            {
              "items": [
                {
                  "id": "12345",
                  "volumeInfo": {
                    "title": "The Hobbit",
                    "authors": ["J.R.R. Tolkien"],
                    "industryIdentifiers": [
                      {"type": "ISBN_13", "identifier": "9780261103344"}
                    ],
                    "categories": ["Fantasy"],
                    "publishedDate": "1937",
                    "pageCount": 310,
                    "description": "A fantasy novel about Bilbo Baggins."
                  }
                }
              ]
            }
        """;

        when(mockHttpResponse.statusCode()).thenReturn(200);
        when(mockHttpResponse.body()).thenReturn(fakeJson);
        when(mockHttpClient.send(
                ArgumentMatchers.any(HttpRequest.class),
                ArgumentMatchers.any(HttpResponse.BodyHandler.class))
        ).thenReturn(mockHttpResponse);

        // When
        ResponseEntity<?> response = googleBooksAPI.search("hobbit");

        // Then
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof JsonReturn);

        JsonReturn result = (JsonReturn) response.getBody();
        assertEquals(1, result.getNum_found());
        Doc book = result.getDocs().get(0);
        assertEquals("The Hobbit", book.getBookname());
        assertEquals("J.R.R. Tolkien", book.getAuthor());
        assertEquals("9780261103344", book.getIsbn());
    }

    @Test
    void search_ReturnsError_WhenGoogleFails() throws Exception {
        when(mockHttpResponse.statusCode()).thenReturn(403);
        when(mockHttpResponse.body()).thenReturn("Quota exceeded");
        when(mockHttpClient.send(
                any(HttpRequest.class),
                ArgumentMatchers.<HttpResponse.BodyHandler<String>>any()
        )).thenReturn((HttpResponse<String>) mockHttpResponse);


        ResponseEntity<?> response = googleBooksAPI.search("hobbit");

        assertEquals(403, response.getStatusCodeValue());
        assertEquals("Quota exceeded", response.getBody());
    }
}

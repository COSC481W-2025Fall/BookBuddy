import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

//This file is the actual google books api search that takes whatever the user input in the search
//and retrieves the top 30 results sorted by relevance
@Service
public class GoogleBooksAPI {
    //The API Key and the base api url that does the actual request
    private static final String API_KEY = "AIzaSyDOSZtEaGtDya1YYpfo8XBumXN4FJCaNWE";
    private static final String BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=<user-input>&maxResults=30&orderBy=relevance&key=YOUR_API_KEY";

    public String searchByIsbn(String isbn) {
        String url = BASE_URL + "isbn:" + isbn + "&key=" + API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }

    public String searchByKeyword(String keyword) {
        String formattedKeyword = keyword.trim().replace(" ", "+");
        String url = BASE_URL + formattedKeyword + "&maxResults=30&orderBy=relevance&key=" + API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response.getBody();
    }
}

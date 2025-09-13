package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonProperty;
import Java.util.List;

public class JsonReturn {
    @JsonProperty("start")
    private int start;

    @JsonProperty("num_found")
    private int num_found;

    @JsonProperty("docs")
    private List<Doc> docs;

    // Getters
    public int getStart() {return start;}
    public int getNum_found() {return num_found;}
    public List<Doc> getDoc() {return docs;}
}

public class Doc {
    // As far as I can tell, the booksearch API doesn't return genres. This might be an issue
    // later for recommendations. Barebones will just search on title and author name.
    @JsonProperty("title")
    private String title;

    @JsonProperty("author_name")
    private List<String> authorName;

    @JsonProperty("first_publish_year")
    private int firstPublishYear;

    @JsonProperty("cover_i")
    private Integer coverId;

    // Getters
    public String getTitle() {return title;}
    public List<String> getAuthorName() {return authorName;}
    public int getFirstPublishYear() {return firstPublishYear;}
    public Integer getCoverId() {return coverId;}
}
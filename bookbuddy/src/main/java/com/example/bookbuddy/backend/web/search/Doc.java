package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

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

package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonReturn {
    @JsonProperty("num_found")
    private int numFound;

    @JsonProperty("docs")
    private List<Doc> docs;



    public void setNumFound(int numFound) { this.numFound = numFound; }
    public void setDocs(List<Doc> docs) { this.docs = docs; }
}
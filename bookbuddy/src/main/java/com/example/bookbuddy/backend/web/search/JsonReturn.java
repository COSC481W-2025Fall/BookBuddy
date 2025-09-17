package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

//public class JsonReturn {
//    @JsonProperty("start")
//    private int start;
//
//    @JsonProperty("num_found")
//    private int num_found;
//
//    @JsonProperty("docs")
//    private List<Doc> docs;
//
//    // Getters
//    public int getStart() {return start;}
//    public int getNum_found() {return num_found;}
//    public List<Doc> getDoc() {return docs;}
//}

import com.fasterxml.jackson.annotation.JsonProperty;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonReturn {
    @JsonProperty("start")
    private int start;

    @JsonProperty("num_found")
    private int numFound;

    @JsonProperty("docs")
    private List<Doc> docs;   // <-- now uses YOUR Doc class

    public int getStart() { return start; }
    public int getNumFound() { return numFound; }
    public List<Doc> getDocs() { return docs; }
}
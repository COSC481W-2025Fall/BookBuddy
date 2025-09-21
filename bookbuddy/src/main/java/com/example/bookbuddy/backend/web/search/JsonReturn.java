package com.example.bookbuddy.backend.web.search;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonReturn {
    @JsonProperty("num_found")
    private int num_found;

    @JsonProperty("docs")
    private List<Doc> docs;

    public int getNum_found() { return num_found; }
    public List<Doc> getDocs() { return docs; }

    public void setNum_found(int num_found) { this.num_found = num_found; }
    public void setDocs(List<Doc> docs) { this.docs = docs; }
}

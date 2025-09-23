package com.example.bookbuddy.backend.web.search;

import java.util.List;

public class JsonReturn {
    private int start;
    private int numFound;
    private List<Doc> docs;   // uses your custom Doc class

    // Getters and setters
    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getNumFound() {
        return numFound;
    }

    public void setNumFound(int numFound) {
        this.numFound = numFound;
    }

    public List<Doc> getDocs() {
        return docs;
    }

    public void setDocs(List<Doc> docs) {
        this.docs = docs;
    }
}

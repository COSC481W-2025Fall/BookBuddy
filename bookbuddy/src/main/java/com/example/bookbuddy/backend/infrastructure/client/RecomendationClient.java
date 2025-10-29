package com.example.bookbuddy.backend.infrastructure.client;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class RecomendationClient {


    @Autowired
    private OpenAiClient openAiClient;
    // Method stubs to satisfy server:
    public String getAPIResponse(String prompt) {
        return openAiClient.getAiResponse(prompt);
    }


}

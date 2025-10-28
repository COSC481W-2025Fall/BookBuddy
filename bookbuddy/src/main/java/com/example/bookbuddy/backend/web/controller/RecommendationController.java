package com.example.bookbuddy.backend.web.controller;

import com.example.bookbuddy.backend.infrastructure.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendation/controller")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true"
)
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping
    public Map<String, String> getRecommendationMessage(@RequestBody Map<String, String> body) {
        String questionData = body.get("questions");
        List<String> symptomsList = Arrays.asList(questionData.split(",\\s*"));
        String result = recommendationService.createRecommendationPrompt(symptomsList);
        return Map.of("response", result);
    }

}

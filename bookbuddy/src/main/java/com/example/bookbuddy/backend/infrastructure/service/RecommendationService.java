package com.example.bookbuddy.backend.infrastructure.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookbuddy.backend.infrastructure.client.RecomendationClient;

@Service
public class RecommendationService {

    @Autowired
    private RecomendationClient recomendationClient;

    public String createRecommendationPrompt(List<String> Questions) {
        // take list and pare it into a large string for prompt entry
        //insert newly created string into prompt string
        //return prompt string.
        //call API response inserting the prompt from the client side.

        int listLength = Questions.size();
        String list = "";
        for (int i=0; i<listLength; i++){
            list += Questions.get(i) + ", ";
        }



        String prompt =  "You are a professional Book Recommender. A client has answered these questions in question/answer format: "
                + list + ".\n\n"
                + "You MUST return EXACTLY ONE book recommendation.\n\n"
                + "Your ENTIRE output MUST consist of EXACTLY THREE LINES in THIS EXACT format (follow the shape only):\n\n"
                + "\"The Hobbit J.R.R. Tolkien\",\n"
                + "Fantasy\n"
                + "This is a short explanation describing why this book fits the user's answers. Keep it under 80 words.\n\n"
                + "STRICT RULES YOU MUST FOLLOW (NO EXCEPTIONS):\n"
                + "- Output MUST be EXACTLY THREE lines and NOTHING else.\n"
                + "- Do NOT add ANY extra text, disclaimers, suggestions, questions, or commentary.\n"
                + "- Do NOT recommend more than one book. ONLY ONE BOOK IS ALLOWED.\n"
                + "- Line 1 MUST be in quotes AND must end with a comma.\n"
                + "- Line 1 MUST contain ONLY: TITLE + one space + AUTHOR.\n"
                + "- REMOVE any # symbols from the title.\n"
                + "- Line 2 MUST contain ONLY ONE genre.\n"
                + "- Line 3 MUST be the explanation (under 80 words).\n"
                + "- DO NOT merge lines. DO NOT combine genre with line 1.\n"
                + "- DO NOT output additional book titles, authors, or recommendations.\n"
                + "- DO NOT start or end with blank lines.\n";

        return recomendationClient.getAPIResponse(prompt);
    }
}

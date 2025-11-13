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



        String prompt = "You are a professional Book Recommender. A client has answered these questions in question/answer format: " + list + ".\n\n" +
                "Please analyze these questions and the clients answers and provide the following:\n" +
                "1. give the top book you would recommend for the client after analyzing the answers to their given questions only giving the book title first.\n" +
                "2. Provide a small one paragraph response as to why you belive this book is a good recommendation for the client.\n" +
                "   - For your response:\n" +
                "     • Give the book title ONLY on the first line.\n" +
                "     • Give the Author name and Genre after adding 1 blank line from the book title.\n" +
                "     • This MUST be given in the format only, NO numbers or any difference:  [BOOK NAME] [new line] [BOOK AUTHOR] , [GENRE] [new line] +\n" +
                "                \"     • Provide a **concise explanation** (no more than 70 words).\\n\\n\" +\n\n" +
                "     • Provide a **concise explanation** (no more than 70 words).\n\n" +
                "Be thorough and precise, and format your response clearly to enhance quick understanding and decision-making.";


        return recomendationClient.getAPIResponse(prompt);
    }
}

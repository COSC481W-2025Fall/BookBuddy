package com.example.bookbuddy.backend.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {

    @GetMapping({"/login", "/signup", "/search", "/library", "/WishBook", "/profile"})
    public String forwardToFrontend() {
        // Always return the main index.html for React routes
        return "forward:/index.html";
    }
}
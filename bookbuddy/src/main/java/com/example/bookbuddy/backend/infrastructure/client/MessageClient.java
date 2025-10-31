package com.example.bookbuddy.backend.infrastructure.client;


import org.springframework.stereotype.Component;

@Component
public class MessageClient {

    public String getExternalMessage(String name) {
        return "Hello, " + name;
    }
}
package com.example.bookbuddy.backend.infrastructure.client;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MessageClientTest {

    MessageClient messageClient = new MessageClient();
    @Test
    void getExternalMessage() {
        assertEquals("Hello, Ryan", messageClient.getExternalMessage("Ryan"));
    }
}
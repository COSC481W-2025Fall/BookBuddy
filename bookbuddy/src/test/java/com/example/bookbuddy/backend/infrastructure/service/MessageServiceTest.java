package com.example.bookbuddy.backend.infrastructure.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

// Mock to bypass Spring issues
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.example.bookbuddy.backend.infrastructure.client.MessageClient;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {
    @Mock
    MessageClient messageClient;

    @InjectMocks
    MessageService messageService;

    @Test
    void createMessage() {
        when(messageClient.getExternalMessage("RYAN")).thenReturn("Hello, RYAN");
        assertEquals("Hello, RYAN", messageService.createMessage("ryan"));
    }
}

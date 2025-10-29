package com.example.bookbuddy.backend.infrastructure.service;


import com.example.bookbuddy.backend.infrastructure.client.MessageClient ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageClient messageClient;

    public String createMessage(String name) {
        // Adds a simple processing step
        String processedName = name.toUpperCase();
        return messageClient.getExternalMessage(processedName);
    }


}
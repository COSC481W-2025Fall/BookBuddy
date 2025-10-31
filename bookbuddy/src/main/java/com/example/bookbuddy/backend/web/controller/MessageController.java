package com.example.bookbuddy.backend.web.controller;
import com.example.bookbuddy.backend.infrastructure.service.MessageService ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recievemessage")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public String getMessage(@RequestParam String name) {
        return messageService.createMessage(name);
    }
}

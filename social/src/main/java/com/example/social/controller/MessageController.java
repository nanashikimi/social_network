package com.example.social.controller;

import com.example.social.dto.SendMessageRequest;
import com.example.social.model.Message;
import com.example.social.service.MessageService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public Message sendMessage(@RequestBody SendMessageRequest req) {
        return messageService.sendMessage(
                req.senderId(),
                req.receiverId(),
                req.content()
        );
    }

    @GetMapping("/{user1Id}/{user2Id}")
    public List<Message> getMessages(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return messageService.getChat(user1Id, user2Id);
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAll();
    }
}

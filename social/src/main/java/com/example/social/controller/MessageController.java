package com.example.social.controller;

import com.example.social.model.Message;
import com.example.social.model.User;
import com.example.social.repo.MessageRepository;
import com.example.social.repo.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepository messageRepo;
    private final UserRepository userRepo;

    public MessageController(MessageRepository messageRepo, UserRepository userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
        if (message.getSender() == null || message.getSender().getId() == null) {
            throw new RuntimeException("Sender is missing in request");
        }
        if (message.getReceiver() == null || message.getReceiver().getId() == null) {
            throw new RuntimeException("Receiver is missing in request");
        }

        User sender = userRepo.findById(message.getSender().getId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepo.findById(message.getReceiver().getId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        message.setSender(sender);
        message.setReceiver(receiver);

        return messageRepo.save(message);
    }

    @GetMapping("/{senderId}/{receiverId}")
    public List<Message> getMessages(@PathVariable Long senderId, @PathVariable Long receiverId) {
        return messageRepo.findAll().stream()
                .filter(m ->
                        (m.getSender().getId().equals(senderId) && m.getReceiver().getId().equals(receiverId)) ||
                                (m.getSender().getId().equals(receiverId) && m.getReceiver().getId().equals(senderId))
                )
                .toList();
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }
}

package com.example.social.service;

import com.example.social.model.Message;
import com.example.social.model.User;
import com.example.social.repo.MessageRepository;
import com.example.social.repo.UserRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public Message sendMessage(Long senderId, Long receiverId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));
        Message message = new Message(sender, receiver, content);
        return messageRepository.save(message);
    }

    public List<Message> getChat(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new RuntimeException("User1 not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new RuntimeException("User2 not found"));
        List<Message> messages = new ArrayList<>();
        messages.addAll(messageRepository.findBySenderAndReceiverOrderByTimestampAsc(user1, user2));
        messages.addAll(messageRepository.findBySenderAndReceiverOrderByTimestampAsc(user2, user1));
        messages.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
        return messages;
    }

    public List<Message> getAll() {
        return messageRepository.findAll();
    }

}

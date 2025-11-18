package com.example.social.dto;

public record SendMessageRequest(Long senderId, Long receiverId, String content) {}

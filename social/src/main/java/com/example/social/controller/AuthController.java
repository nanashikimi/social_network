package com.example.social.controller;

import com.example.social.model.User;
import com.example.social.repo.UserRepository;
import com.example.social.security.JwtService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return userRepo.findByEmail(user.getEmail())
                .filter(u -> u.getPassword() != null && u.getPassword().equals(user.getPassword()))
                .map(u -> {
                    String token = jwtService.generateToken(u.getEmail());
                    return ResponseEntity.ok(Map.of("token", token));
                })
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid credentials")));
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


}

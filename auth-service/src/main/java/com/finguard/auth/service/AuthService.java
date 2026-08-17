package com.finguard.auth.service;

import com.finguard.auth.entity.User;
import com.finguard.auth.repository.UserRepository;
import com.finguard.auth.controller.AuthController.LoginRequest;
import com.finguard.auth.controller.AuthController.RegisterRequest;
import com.finguard.auth.controller.AuthController.AuthResponse;
import com.finguard.auth.controller.AuthController.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public ApiResponse register(RegisterRequest request) {
        log.info("Processing user registration for email: {}", request.getEmail());
        
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("User registration failed. Email already registered: {}", request.getEmail());
            return ApiResponse.builder()
                    .success(false)
                    .message("Email is already registered in our system.")
                    .build();
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of("ROLE_CUSTOMER"))
                .build();

        userRepository.save(user);
        log.info("User registered successfully with ID: {}", user.getId());

        return ApiResponse.builder()
                .success(true)
                .message("User registered successfully. You can now log in.")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        log.info("Processing user authentication for email: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials or user not found."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            log.warn("Authentication failed. Password mismatch for user: {}", request.getEmail());
            throw new RuntimeException("Invalid credentials or user not found.");
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            log.warn("Authentication failed. User status is not ACTIVE: {}", request.getEmail());
            throw new RuntimeException("User account is locked or deactivated.");
        }

        // Generate Tokens
        String token = jwtService.generateToken(user.getEmail(), new ArrayList<>(user.getRoles()));
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        // Update User Refresh Token in DB
        user.setRefreshTokenHash(refreshToken);
        userRepository.save(user);

        log.info("User authenticated successfully. Tokens dispatched for user: {}", user.getEmail());

        return AuthResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .mfaRequired(user.getMfaEnabled() != null && user.getMfaEnabled())
                .build();
    }
}

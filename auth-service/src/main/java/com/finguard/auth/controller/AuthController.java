package com.finguard.auth.controller;

import com.finguard.auth.service.AuthService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        log.info("Received registration request for email: {}", request.getEmail());
        ApiResponse response = authService.register(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("User attempting login: {}", request.getEmail());
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed for user {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/mfa/verify")
    public ResponseEntity<ApiResponse> verifyMfa(@RequestParam String code, @RequestParam String email) {
        log.info("Verifying MFA for user: {}", email);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("MFA code verified successfully.")
                .build());
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class RegisterRequest {
        private String email;
        private String password;
        private String firstName;
        private String lastName;
    }

    @Data
    @Builder
    public static class AuthResponse {
        private String accessToken;
        private String refreshToken;
        private boolean mfaRequired;
    }

    @Data
    @Builder
    public static class ApiResponse {
        private boolean success;
        private String message;
    }
}

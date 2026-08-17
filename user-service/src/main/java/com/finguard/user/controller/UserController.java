package com.finguard.user.controller;

import com.finguard.user.service.UserService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDto> getProfile(@RequestHeader("X-User-Id") String userId) {
        log.info("Fetching profile for user ID: {}", userId);
        return ResponseEntity.ok(userService.getOrCreateProfile(userId));
    }

    @PostMapping("/kyc/upload")
    public ResponseEntity<KycResponse> uploadKyc(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam("documentUrl") String documentUrl) {
        log.info("User {} uploaded KYC document: {}", userId, documentUrl);
        return ResponseEntity.ok(userService.uploadKyc(userId, documentUrl));
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDto>> getAccounts(@RequestHeader("X-User-Id") String userId) {
        log.info("Fetching accounts for user ID: {}", userId);
        return ResponseEntity.ok(userService.getOrCreateAccounts(userId));
    }

    @Data
    @Builder
    public static class ProfileDto {
        private String userId;
        private String firstName;
        private String lastName;
        private String email;
        private String phoneNumber;
        private String kycStatus;
    }

    @Data
    @Builder
    public static class KycResponse {
        private boolean success;
        private String message;
        private String status;
    }

    @Data
    @Builder
    public static class AccountDto {
        private String accountId;
        private String accountNumber;
        private String accountType;
        private BigDecimal balance;
        private String currency;
    }
}

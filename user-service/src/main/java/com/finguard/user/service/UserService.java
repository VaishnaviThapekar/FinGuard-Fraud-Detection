package com.finguard.user.service;

import com.finguard.user.entity.BankAccount;
import com.finguard.user.entity.UserProfile;
import com.finguard.user.repository.BankAccountRepository;
import com.finguard.user.repository.UserProfileRepository;
import com.finguard.user.controller.UserController.ProfileDto;
import com.finguard.user.controller.UserController.AccountDto;
import com.finguard.user.controller.UserController.KycResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserProfileRepository userProfileRepository;
    private final BankAccountRepository bankAccountRepository;

    @Transactional
    public ProfileDto getOrCreateProfile(String userId) {
        log.info("Fetching profile for user ID: {}", userId);
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseGet(() -> {
                    log.info("Creating default profile record for user ID: {}", userId);
                    UserProfile defaultProfile = UserProfile.builder()
                            .userId(userId)
                            .firstName("Analyst")
                            .lastName("Member")
                            .phoneNumber("+1234567890")
                            .kycStatus("VERIFIED")
                            .build();
                    return userProfileRepository.save(defaultProfile);
                });

        return ProfileDto.builder()
                .userId(profile.getUserId())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .phoneNumber(profile.getPhoneNumber())
                .kycStatus(profile.getKycStatus())
                .build();
    }

    @Transactional
    public KycResponse uploadKyc(String userId, String documentUrl) {
        log.info("Processing KYC upload for user ID: {}", userId);
        UserProfile profile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("UserProfile not found for ID: " + userId));

        profile.setKycDocumentUrl(documentUrl);
        profile.setKycStatus("PENDING_APPROVAL");
        userProfileRepository.save(profile);

        log.info("KYC document registered for user ID: {}. Status set to PENDING_APPROVAL", userId);
        return KycResponse.builder()
                .success(true)
                .message("KYC Document uploaded and pending review.")
                .status("PENDING_APPROVAL")
                .build();
    }

    @Transactional
    public List<AccountDto> getOrCreateAccounts(String userId) {
        log.info("Retrieving accounts for user ID: {}", userId);
        List<BankAccount> accounts = bankAccountRepository.findByUserProfileUserId(userId);

        if (accounts.isEmpty()) {
            log.info("No bank accounts found. Seeding savings and checking accounts for user: {}", userId);
            UserProfile profile = userProfileRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("UserProfile record must exist before account creation."));

            BankAccount savings = BankAccount.builder()
                    .id(UUID.randomUUID().toString())
                    .userProfile(profile)
                    .accountNumber("US98765" + (int)Math.floor(10000 + Math.random() * 90000))
                    .accountType("SAVINGS")
                    .balance(new BigDecimal("12450.75"))
                    .currency("USD")
                    .status("ACTIVE")
                    .build();

            BankAccount checking = BankAccount.builder()
                    .id(UUID.randomUUID().toString())
                    .userProfile(profile)
                    .accountNumber("US12345" + (int)Math.floor(10000 + Math.random() * 90000))
                    .accountType("CHECKING")
                    .balance(new BigDecimal("3500.50"))
                    .currency("USD")
                    .status("ACTIVE")
                    .build();

            accounts = new ArrayList<>(List.of(
                    bankAccountRepository.save(savings),
                    bankAccountRepository.save(checking)
            ));
        }

        return accounts.stream().map(acc -> AccountDto.builder()
                .accountId(acc.getId())
                .accountNumber(acc.getAccountNumber())
                .accountType(acc.getAccountType())
                .balance(acc.getBalance())
                .currency(acc.getCurrency())
                .build()
        ).collect(Collectors.toList());
    }
}

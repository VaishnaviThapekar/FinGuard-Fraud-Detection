package com.finguard.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "bank_accounts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankAccount {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserProfile userProfile;

    @Column(name = "account_number", unique = true, nullable = false, length = 50)
    private String accountNumber;

    @Column(name = "account_type", nullable = false, length = 50)
    private String accountType;

    @Column(nullable = false, precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(length = 3)
    @Builder.Default
    private String currency = "USD";

    @Column(length = 50)
    @Builder.Default
    private String status = "ACTIVE";

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
        updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = ZonedDateTime.now();
    }
}

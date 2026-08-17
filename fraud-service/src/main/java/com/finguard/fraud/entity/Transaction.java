package com.finguard.fraud.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "sender_account_number", nullable = false, length = 50)
    private String senderAccountNumber;

    @Column(name = "receiver_account_number", nullable = false, length = 50)
    private String receiverAccountNumber;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(length = 3)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "merchant_category", length = 100)
    private String merchantCategory;

    @Column(name = "merchant_name")
    private String merchantName;

    @Column(name = "location_latitude", precision = 9, scale = 6)
    private BigDecimal locationLatitude;

    @Column(name = "location_longitude", precision = 9, scale = 6)
    private BigDecimal locationLongitude;

    @Column(name = "device_fingerprint")
    private String deviceFingerprint;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(length = 50)
    @Builder.Default
    private String channel = "ONLINE";

    @Column(length = 50)
    @Builder.Default
    private String status = "PENDING";

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = ZonedDateTime.now();
    }
}

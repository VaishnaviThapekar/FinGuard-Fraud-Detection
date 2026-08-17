package com.finguard.fraud.controller;

import com.finguard.fraud.client.PythonMLClient;
import com.finguard.fraud.entity.Transaction;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/fraud")
@RequiredArgsConstructor
@Slf4j
public class TransactionController {

    private final PythonMLClient pythonMLClient;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @PostMapping("/transactions")
    public ResponseEntity<TransactionResponse> processTransaction(@RequestBody TransactionRequest request) {
        log.info("Processing incoming transaction: sender={}, receiver={}, amount={}",
                request.getSenderAccountNumber(), request.getReceiverAccountNumber(), request.getAmount());

        Transaction transaction = Transaction.builder()
                .id(UUID.randomUUID().toString())
                .senderAccountNumber(request.getSenderAccountNumber())
                .receiverAccountNumber(request.getReceiverAccountNumber())
                .amount(request.getAmount())
                .merchantCategory(request.getMerchantCategory())
                .merchantName(request.getMerchantName())
                .channel(request.getChannel())
                .ipAddress(request.getIpAddress())
                .deviceFingerprint(request.getDeviceFingerprint())
                .status("PENDING")
                .build();

        // 1. Evaluate with Python models via REST client
        PythonMLClient.MlResponse evaluation = pythonMLClient.evaluateTransaction(transaction);
        
        transaction.setStatus("APPROVED");
        if ("HIGH".equalsIgnoreCase(evaluation.getRiskLevel()) || "CRITICAL".equalsIgnoreCase(evaluation.getRiskLevel())) {
            transaction.setStatus("FLAG_SUSPICIOUS");
            
            // 2. Alert notification via Kafka
            log.warn("SUSPICIOUS TRANSACTION DETECTED: ID={}, Probability={}", transaction.getId(), evaluation.getFraudProbability());
            try {
                kafkaTemplate.send("fraud-alerts", transaction.getId(), Map.of(
                        "transactionId", transaction.getId(),
                        "amount", transaction.getAmount(),
                        "sender", transaction.getSenderAccountNumber(),
                        "receiver", transaction.getReceiverAccountNumber(),
                        "riskLevel", evaluation.getRiskLevel(),
                        "probability", evaluation.getFraudProbability()
                ));
            } catch (Exception e) {
                log.error("Failed to publish alert to Kafka cluster: {}", e.getMessage());
            }
        }

        return ResponseEntity.ok(TransactionResponse.builder()
                .transactionId(transaction.getId())
                .status(transaction.getStatus())
                .fraudProbability(evaluation.getFraudProbability())
                .confidenceScore(evaluation.getConfidenceScore())
                .riskLevel(evaluation.getRiskLevel())
                .reason(evaluation.getReason())
                .modelName(evaluation.getModelName())
                .shapExplanation(evaluation.getShapExplanation())
                .limeExplanation(evaluation.getLimeExplanation())
                .build());
    }

    @Data
    public static class TransactionRequest {
        private String senderAccountNumber;
        private String receiverAccountNumber;
        private BigDecimal amount;
        private String merchantCategory;
        private String merchantName;
        private String channel;
        private String ipAddress;
        private String deviceFingerprint;
    }

    @Data
    @Builder
    public static class TransactionResponse {
        private String transactionId;
        private String status;
        private BigDecimal fraudProbability;
        private BigDecimal confidenceScore;
        private String riskLevel;
        private String reason;
        private String modelName;
        private Map<String, Object> shapExplanation;
        private Map<String, Object> limeExplanation;
    }
}

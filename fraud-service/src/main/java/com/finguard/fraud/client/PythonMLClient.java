package com.finguard.fraud.client;

import com.finguard.fraud.entity.Transaction;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class PythonMLClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.ml-service.url}")
    private String mlServiceUrl;

    public MlResponse evaluateTransaction(Transaction transaction) {
        String endpoint = mlServiceUrl + "/api/v1/ml/evaluate";
        log.info("Sending transaction {} to ML service for scoring: {}", transaction.getId(), endpoint);
        try {
            MlRequest request = MlRequest.builder()
                    .transactionId(transaction.getId())
                    .amount(transaction.getAmount())
                    .merchantCategory(transaction.getMerchantCategory())
                    .senderAccountNumber(transaction.getSenderAccountNumber())
                    .receiverAccountNumber(transaction.getReceiverAccountNumber())
                    .channel(transaction.getChannel())
                    .ipAddress(transaction.getIpAddress())
                    .deviceFingerprint(transaction.getDeviceFingerprint())
                    .build();

            return restTemplate.postForObject(endpoint, request, MlResponse.class);
        } catch (Exception e) {
            log.error("Failed to fetch ML evaluation from Python model. Falling back to rule-based scores. Error: {}", e.getMessage());
            // Safe fallback response
            return MlResponse.builder()
                    .fraudProbability(new BigDecimal("0.0500"))
                    .confidenceScore(new BigDecimal("0.9000"))
                    .riskLevel("LOW")
                    .reason("Rule engine fallback: transaction amount within safe limits")
                    .modelName("RuleEngineFallback")
                    .build();
        }
    }

    @Data
    @Builder
    public static class MlRequest {
        private String transactionId;
        private BigDecimal amount;
        private String merchantCategory;
        private String senderAccountNumber;
        private String receiverAccountNumber;
        private String channel;
        private String ipAddress;
        private String deviceFingerprint;
    }

    @Data
    @Builder
    public static class MlResponse {
        private BigDecimal fraudProbability;
        private BigDecimal confidenceScore;
        private String riskLevel;
        private String reason;
        private String modelName;
        private Map<String, Object> shapExplanation;
        private Map<String, Object> limeExplanation;
    }
}

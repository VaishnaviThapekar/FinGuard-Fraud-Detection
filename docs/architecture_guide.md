# FinGuard AI - Microservice Architecture & API Reference Guide

This document describes the microservices topology, communication boundaries, database mappings, and core API request/response JSON schemas for **FinGuard AI**.

---

## 1. System Topology Overview

```text
                               +-------------------+
                               | React 19 Frontend |
                               +-------------------+
                                         |
                                         v
                               +-------------------+
                               |    API Gateway    | (Port 8080)
                               +-------------------+
                                 /       |       \
                                /        |        \
        +----------------------+         |         +-----------------------+
        | auth-service (8081)  |   user-service    |  fraud-service (8083) |
        +----------------------+   (Port 8082)     +-----------------------+
                                                               |
                                                       +---------------+---------------+
                                                       |                               |
                                                       v                               v
                                              ml_engine (FastAPI, 8000)      rag-service (FastAPI, 8001)
```

---

## 2. Core API Reference Specifications

### 2.1. Authentication Service (`auth-service`)

#### POST `/api/v1/auth/register`
Creates a new corporate analyst profile.
- **Request Body**:
```json
{
  "email": "analyst@finguard.com",
  "password": "Password123",
  "role": "ANALYST"
}
```
- **Response (201 Created)**:
```json
{
  "message": "User registered successfully",
  "userId": "usr_9921029",
  "mfaSecret": "otpauth://totp/FinGuard:analyst@finguard.com?secret=JBSWY3DPEHPK3PXP"
}
```

#### POST `/api/v1/auth/login`
Authenticates credentials and returns a temporary validation token.
- **Request Body**:
```json
{
  "email": "analyst@finguard.com",
  "password": "Password123"
}
```
- **Response (200 OK)**:
```json
{
  "tempToken": "tmp_tok_881209",
  "mfaRequired": true
}
```

---

### 2.2. Fraud ML Engine (`fraud-service/ml_engine`)

#### POST `/api/v1/ml/evaluate`
Calculates transaction fraud probabilities and SHAP/LIME explanation weights.
- **Request Body**:
```json
{
  "amount": 8500.0,
  "lat_diff": 0.45,
  "lon_diff": 0.32,
  "hour_of_day": 3.0,
  "device_risk": 0.95
}
```
- **Response (200 OK)**:
```json
{
  "fraud_probability": 0.9125,
  "anomaly_score": 0.0874,
  "risk_level": "CRITICAL",
  "explanations": {
    "shap": {
      "base_value": 0.15,
      "values": [0.45, 0.22, 0.05, 0.11, 0.08],
      "display_values": [8500.0, 0.45, 0.32, 3.0, 0.95]
    },
    "lime": {
      "intercept": 0.12,
      "attributions": [
        ["amount > 5000", 0.45],
        ["device_risk > 0.8", 0.22]
      ]
    }
  }
}
```

---

## 3. Kafka Event Schemas

All high-risk transaction alerts are broadcasted asynchronously via Apache Kafka.

### Topic: `fraud-alerts`
- **Key**: Transaction UUID
- **Payload Schema**:
```json
{
  "eventId": "evt_99120",
  "transactionId": "tx_993",
  "accountNumber": "US1234567890",
  "amount": 8500.00,
  "fraudProbability": 0.9125,
  "riskLevel": "CRITICAL",
  "timestamp": "2026-07-18T04:30:45Z"
}
```

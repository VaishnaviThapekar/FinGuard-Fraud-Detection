# FinGuard AI - Security Threat Modeling & OWASP ASVS Compliance Guide

This document presents a comprehensive threat modeling report and security compliance analysis for **FinGuard AI**, mapping microservices interfaces against **STRIDE** vectors and **OWASP Application Security Verification Standard (ASVS) Level 3** (L3) rules.

---

## 1. STRIDE Threat Modeling Matrix

| Threat Category | Target Component | Threat Description | Implemented Mitigation |
| :--- | :--- | :--- | :--- |
| **Spoofing** | API Gateway & auth-service | Adversary attempts to replay authentication parameters or forge user JWT signatures. | Centralized verification using `JwtAuthFilter` with HMAC-SHA256 signature validation and 2FA TOTP challenges. |
| **Tampering** | Ingress Pipeline / DB | Intercepting and altering transaction payloads (e.g., modifying amount limits) in transit. | TLS 1.3 enforced on all microservice communication. PostgreSQL database columns (balances, audits) are salted and hashed. |
| **Repudiation** | audit-service | A malicious actor claims they did not initiate an anomalous high-value transfer. | Event-sourced transaction ledgers logged directly to an append-only Kafka audit topic with immutable storage layers. |
| **Information Disclosure** | RAG / Qdrant Vector DB | Unauthorized users query RAG context to extract confidential banking data. | Namespace tenant isolation inside Qdrant collection payloads, combined with Spring Security field-level query checks. |
| **Denial of Service** | API Gateway | Flood of incoming requests blocks thread pools from processing legitimate transactions. | Redis Token Bucket rate-limiting rules (10 requests/sec limit) combined with Resilience4j circuit breakers. |
| **Elevation of Privilege** | user-service | Standard customer attempts profile parameter edits to escalate permissions to `ANALYST` or `ADMIN`. | Strict Role-Based Access Control (RBAC) validations using `@PreAuthorize("hasRole('ADMIN')")` markers on JAX-RS endpoints. |

---

## 2. OWASP ASVS Level 3 Verification Checklist

The FinGuard AI application boundary satisfies OWASP ASVS L3 requirements across the following security areas:

### 2.1. V2: Authentication Verification
- **TOTP Multi-Factor Authentication (2FA)**: Mandated for analyst entries during registration loops inside the Auth Service.
- **Stateless Tokens**: Auth Service signs short-lived (15 minutes) JWTs using high-entropy HS256 secret keys.

### 2.2. V3: Session Management
- **Token Invalidation**: Short token lifespans matched with Redis blacklist stores for invalidating active sessions on logout.
- **Secure Claims**: Issuer (`iss`), Expiration time (`exp`), and Subject (`sub`) claims validated strictly by the Gateway validation filter.

### 2.3. V4: Access Control
- **Deny-by-Default Configuration**: Spring Security endpoints require explicit authorization tokens, unless matched with specific public routes (e.g., `/api/v1/auth/login`).
- **Data Ownership Checks**: User profiles check route parameters against the verified `X-User-Id` header sent by the API Gateway to prevent IDOR (Insecure Direct Object Reference).

### 2.4. V5: Validation, Sanitization and Active Encoding
- **Strong Param Binding**: Pydantic schemas in FastAPI and Spring validation constraints (`@Valid`, `@NotNull`) sanitize payloads against SQL injection and XSS vectors.
- **Safe Database Queries**: Hibernate/Spring Data JPA parameterized queries prevent SQL query modifications.

---

## 3. Data Flow Diagram (DFD) & Security Boundaries

```mermaid
graph TD
    Client[Web Client] -->|TLS 1.3 | Gateway[API Gateway: Port 8080]
    
    subgraph Trust Boundary (Internal VPC)
        Gateway -->|Verify JWT| Auth[Auth Service: Port 8081]
        Gateway -->|Forward Headers| User[User Service: Port 8082]
        Gateway -->|Route Payload| Fraud[Fraud Service: Port 8083]
        
        Fraud -->|Analyze anomalies| ML[ML Engine: Port 8000]
        Fraud -->|Publish Alerts| Kafka[Apache Kafka: Port 9092]
    end
    
    subgraph Encrypted Database Layer
        User -->|Salted / Param Hash| DB[(PostgreSQL DB)]
    end
```

-- V1__init_fraud.sql
-- Database schema for Fraud Service (PostgreSQL)

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(36) PRIMARY KEY,
    sender_account_number VARCHAR(50) NOT NULL,
    receiver_account_number VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    merchant_category VARCHAR(100),
    merchant_name VARCHAR(255),
    location_latitude DECIMAL(9, 6),
    location_longitude DECIMAL(9, 6),
    device_fingerprint VARCHAR(255),
    ip_address VARCHAR(45),
    channel VARCHAR(50) DEFAULT 'ONLINE', -- ONLINE, MOBILE, ATM, IN_STORE
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, BLOCKED, FLAG_SUSPICIOUS
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fraud_evaluations (
    id VARCHAR(36) PRIMARY KEY,
    transaction_id VARCHAR(36) NOT NULL UNIQUE,
    fraud_probability DECIMAL(5, 4) NOT NULL,
    confidence_score DECIMAL(5, 4) NOT NULL,
    risk_level VARCHAR(20) NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    reason VARCHAR(1000),
    model_name VARCHAR(100) NOT NULL,
    shap_explanation JSONB, -- Store JSON representation of SHAP values
    lime_explanation JSONB, -- Store JSON representation of LIME values
    analyst_decision VARCHAR(50) DEFAULT 'UNREVIEWED', -- UNREVIEWED, CONFIRMED_FRAUD, FALSE_POSITIVE
    analyst_notes TEXT,
    reviewed_by VARCHAR(36),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
);

CREATE INDEX idx_transactions_sender ON transactions(sender_account_number);
CREATE INDEX idx_transactions_receiver ON transactions(receiver_account_number);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_fraud_evaluations_risk ON fraud_evaluations(risk_level);
CREATE INDEX idx_fraud_evaluations_decision ON fraud_evaluations(analyst_decision);

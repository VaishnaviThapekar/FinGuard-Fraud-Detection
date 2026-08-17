-- V1__init_audit.sql
-- Database schema for Audit Service (PostgreSQL)

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    email VARCHAR(255),
    action VARCHAR(100) NOT NULL, -- e.g., USER_LOGIN, TRANS_BLOCKED, KYC_APPROVED
    resource_type VARCHAR(100) NOT NULL, -- e.g., TRANSACTION, USER, DOCUMENT
    resource_id VARCHAR(100),
    status VARCHAR(50) NOT NULL, -- SUCCESS, FAILED, WARNING
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    details TEXT, -- JSON or string context
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

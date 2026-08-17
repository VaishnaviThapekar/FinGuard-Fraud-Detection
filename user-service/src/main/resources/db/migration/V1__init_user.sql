-- V1__init_user.sql
-- Database schema for User Service (PostgreSQL)

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    kyc_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    kyc_document_url VARCHAR(555),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bank_accounts (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- SAVINGS, CHECKING, CREDIT
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, CLOSED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profiles(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_user_profiles_phone ON user_profiles(phone_number);
CREATE INDEX idx_bank_accounts_number ON bank_accounts(account_number);
CREATE INDEX idx_bank_accounts_user_id ON bank_accounts(user_id);

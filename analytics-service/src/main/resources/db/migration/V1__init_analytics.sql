-- V1__init_analytics.sql
-- Database schema for Analytics Service (PostgreSQL)

CREATE TABLE IF NOT EXISTS transaction_aggregations (
    id SERIAL PRIMARY KEY,
    aggregation_date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    transaction_count INTEGER NOT NULL DEFAULT 0,
    fraud_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS risk_distribution (
    id SERIAL PRIMARY KEY,
    evaluation_date DATE NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_trans_agg_date_cat ON transaction_aggregations(aggregation_date, category);
CREATE UNIQUE INDEX idx_risk_dist_date_level ON risk_distribution(evaluation_date, risk_level);

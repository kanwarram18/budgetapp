-- V1: Initial schema setup
-- This migration establishes the schema. Tables are added in subsequent migrations.

-- We create a simple app_info table to verify Flyway is working
CREATE TABLE IF NOT EXISTS app_info (
    key   VARCHAR(100) PRIMARY KEY,
    value VARCHAR(500) NOT NULL
);

INSERT INTO app_info (key, value) VALUES ('schema_version', '1');
INSERT INTO app_info (key, value) VALUES ('app_name', 'budgetapp');

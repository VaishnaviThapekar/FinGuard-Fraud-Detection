import { test, expect } from '@playwright/test';

test.describe('FinGuard AI Dashboard Operations', () => {

  test('should load login screen and authenticate', async ({ page }) => {
    // Navigate to local server
    await page.goto('http://localhost:3000');

    // Verify brand header is visible
    await expect(page.locator('text=FinGuard AI')).toBeVisible();

    // Fill credentials
    await page.fill('input[type="email"]', 'analyst@finguard.com');
    await page.fill('input[type="password"]', 'Password123');

    // Click Login
    await page.click('button[type="submit"]');

    // Verify main console loads
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Active Session: Secure Token JWT Verified')).toBeVisible();
  });

  test('should navigate across navigation tabs', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type="email"]', 'analyst@finguard.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');

    // Click AI Fraud Analysis tab
    await page.click('button:has-text("AI Fraud Analysis")');
    await expect(page.locator('text=SHAP Feature Attribution')).toBeVisible();

    // Click LLM Chat & RAG tab
    await page.click('button:has-text("LLM Chat & RAG")');
    await expect(page.locator('text=RAG Knowledge Bank')).toBeVisible();
    await expect(page.locator('input[placeholder*="Ask about flag anomalies"]')).toBeVisible();

    // Click OCR Verification tab
    await page.click('button:has-text("OCR Verification")');
    await expect(page.locator('text=KYC Document Ingestion Engine')).toBeVisible();
  });
});

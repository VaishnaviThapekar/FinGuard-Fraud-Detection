// k6_load_test.js
// Load testing script for FinGuard AI API Gateway transaction ingress

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Warmup to 20 users
    { duration: '1m', target: 100 },   // Ramp up to 100 users
    { duration: '30s', target: 0 },   // Cool down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must complete under 200ms
    http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  const url = `${BASE_URL}/api/v1/fraud/transactions`;
  
  const payload = JSON.stringify({
    senderAccountNumber: 'US1234567890',
    receiverAccountNumber: 'KY992019280',
    amount: Math.floor(Math.random() * 10000) + 1,
    merchantCategory: 'Retail',
    merchantName: 'Supermarket Inc',
    channel: 'ONLINE',
    ipAddress: '192.168.1.10',
    deviceFingerprint: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer usr_mock_token_123456'
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'is status 200': (r) => r.status === 200,
    'has transaction id': (r) => JSON.parse(r.body).transactionId !== undefined,
  });

  sleep(1);
}

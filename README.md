# FinGuard AI — Enterprise Financial Fraud Detection & Security Command Center

AI-Powered Financial Fraud Detection, Real-Time Threat Intelligence, Intelligent Compliance Assistant, and Explainable AI (XAI) Platform.

FinGuard AI is a production-grade, enterprise monorepo containing microservices, frontend applications, machine learning runtimes (PyTorch Autoencoders & XGBoost), and infrastructure manifests for securing banking platforms.

---

## 🚀 Project Overview
**FinGuard AI** acts as a real-time security command center (SOC) for financial institutions. By combining deep learning anomaly detection with explainable attributions (SHAP), it empowers security analysts to monitor global transaction streams, detect complex fraud vectors, simulate attacks, and generate cryptographic compliance reports in real-time.

---

## 💎 Premium Features & Visual UX

* **🧪 Live Interactive Fraud Simulator Studio**: Construct custom transaction parameters (*Amount, Country, Channel, Velocity, IP Reputation*) and run real-time risk evaluations with XGBoost scores & SHAP feature attributions. Includes 1-click attack stress testers (*Carding Surge, Offshore Laundering Sweep, Bot Blitz*).
* **🌍 3D Global Threat Map Visualizer**: Interactive animated wire transfer visualizer across major international banking hubs (*New York, London, Zurich, Cayman Islands, Singapore, Tokyo*) with pulsing threat beacons and node telemetry inspectors.
* **📄 Executive Export & Audit Reporting Hub**: One-click CSV ledger export, PDF audit digests, and printable **Official Compliance Certificates** with SHA-256 cryptographic signatures.
* **⚙️ Visual Custom Rule Builder & Webhooks**: Drag-and-drop rule configurator with live Slack & Discord webhook payload testers.
* **🪟 Sleek Floating Mac-Style Glass Dock**: Floating action dock for quick access to Command Palette (`Ctrl+K`), AI Copilot (`Ctrl+Shift+C`), Security Scanners, and Theme Controls.
* **🧊 3D Card Hover Tilt Effects**: Dashboard cards calculate 3D perspective pitch & roll tilt following mouse cursor movement with glowing radial spotlights.
* **📊 Live Audio Spectrum Meters**: Animated frequency meters pulsing in real-time on active monitoring telemetry widgets.
* **🎙️ Voice & Multi-Lingual AI Copilot**: Voice security assistant supporting seamless i18n switching between English, Spanish, French, German, and Japanese.

---

## 🔍 Keyboard Shortcuts
* `Ctrl+K`: Open Command Palette.
* `Ctrl+Shift+C`: Toggle AI Security Copilot drawer.
* `Ctrl+Shift+T`: Toggle Dark / Light theme.
* `Ctrl+Shift+S`: Trigger system security scan.
* `Escape`: Close modals and drawers.

---

## 📁 Monorepo Architecture
* `frontend/`: Vite 5 + React 19 + TypeScript + Tailwind CSS dashboard application.
* `fraud-service/`: Python ML engine running PyTorch Autoencoders and FastAPI prediction endpoints.
* `gateway/`: Spring Cloud API Gateway for ingress routing and auth token validation.
* `auth-service/`: Authentication server supporting JWT, WebAuthn Passkeys, and OAuth2.
* `rag-service/`: Compliance vector search engine powered by Qdrant.
* `ocr-service/`: Document parsing engine for passport and ID verification.
* `terraform/` & `kubernetes/`: Infrastructure-as-code and Helm orchestration manifests.

---

## 🛠️ Quick Start Guide

### 1. Run Frontend Application
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Navigate to **`http://localhost:3000`** in your browser.

### 2. Run ML Engine Backend (Optional)
```bash
cd fraud-service/ml_engine
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
FastAPI interactive docs will be live at **`http://localhost:8000/docs`**.

---

## 🔒 Security & Verification
* **Strict RFC Email Validation**: Prevents unauthorized access or malformed logins.
* **FIDO2 WebAuthn Passkey Vault**: Biometric authentication support.
* **JWT & MFA Verification**: 2-Factor authentication token generation.

# train_on_dataset.py
# Production training pipeline for FinGuard AI using real / benchmark CSV datasets

import os
import argparse
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.ensemble import IsolationForest
import xgboost as xgb
import joblib

MODEL_DIR = os.path.join(os.path.dirname(__file__), "saved_models")
os.makedirs(MODEL_DIR, exist_ok=True)

def parse_args():
    parser = argparse.ArgumentParser(description="Train FinGuard AI on a real dataset")
    parser.add_argument(
        "--dataset",
        type=str,
        default=os.path.join(os.path.dirname(__file__), "..", "..", "datasets", "creditcard_sample.csv"),
        help="Path to CSV dataset"
    )
    return parser.parse_args()

def extract_features(df: pd.DataFrame):
    """
    Extract or synthesize the 5 core behavioral features:
    [amount, lat_diff, lon_diff, hour_of_day, device_risk]
    Works with both custom FinGuard CSV formats and standard Kaggle datasets.
    """
    # 1. Amount
    if 'amount' in df.columns:
        amount = df['amount'].astype(float).values
    elif 'Amount' in df.columns:
        amount = df['Amount'].astype(float).values
    else:
        amount = np.zeros(len(df))

    # 2. Geographic Latitude / Longitude deviation
    if 'location' in df.columns:
        high_risk_locs = ['Cayman Islands', 'Panama City, Panama', 'Nigeria', 'Russia']
        lat_diff = np.where(df['location'].isin(high_risk_locs), 0.85, 0.12)
        lon_diff = np.where(df['location'].isin(high_risk_locs), 0.82, 0.15)
    elif 'V1' in df.columns and 'V2' in df.columns:
        lat_diff = np.abs(df['V1'].values) / (np.max(np.abs(df['V1'].values)) + 1e-5)
        lon_diff = np.abs(df['V2'].values) / (np.max(np.abs(df['V2'].values)) + 1e-5)
    else:
        lat_diff = np.random.uniform(0.1, 0.3, size=len(df))
        lon_diff = np.random.uniform(0.1, 0.3, size=len(df))

    # 3. Hour of day (0.0 to 24.0)
    if 'channel' in df.columns:
        hour_of_day = np.where(df['channel'].isin(['Crypto Gateway', 'SWIFT Wire']), 3.0, 14.0)
    elif 'Time' in df.columns:
        hour_of_day = (df['Time'].values % 86400) / 3600.0
    else:
        hour_of_day = np.random.uniform(8.0, 20.0, size=len(df))

    # 4. Device risk score (0.0 to 1.0)
    if 'device' in df.columns:
        device_risk = np.where(df['device'].str.contains('Linux|Tor|Proxy', case=False, na=False), 0.92, 0.15)
    else:
        device_risk = np.random.uniform(0.05, 0.25, size=len(df))

    X = np.column_stack([amount, lat_diff, lon_diff, hour_of_day, device_risk])

    # Target
    if 'is_fraud' in df.columns:
        y = df['is_fraud'].astype(int).values
    elif 'Class' in df.columns:
        y = df['Class'].astype(int).values
    else:
        # Unsupervised synthetic thresholding
        y = np.where((amount > 5000) | (device_risk > 0.8), 1, 0)

    return X, y

def train(dataset_path: str):
    print(f"Loading dataset from: {dataset_path}")
    df = pd.read_csv(dataset_path)
    print(f"Dataset successfully loaded. Total records: {len(df):,}")

    X, y = extract_features(df)
    fraud_count = int(np.sum(y))
    print(f"Extracted feature matrix shape: {X.shape}. Fraud samples: {fraud_count} ({fraud_count/len(y):.2%})")

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y if fraud_count > 5 else None)

    # 1. Supervised XGBoost Classifier
    print("\n[1/2] Training XGBoost Fraud Classifier...")
    scale_pos = max(1.0, (len(y_train) - np.sum(y_train)) / (np.sum(y_train) + 1e-5))
    xgb_model = xgb.XGBClassifier(
        n_estimators=50,
        max_depth=4,
        learning_rate=0.08,
        scale_pos_weight=scale_pos,
        random_state=42,
        eval_metric="logloss"
    )
    xgb_model.fit(X_train, y_train)

    # 2. Unsupervised Isolation Forest (Zero-Day Anomaly Detection)
    print("[2/2] Training Unsupervised Isolation Forest...")
    contamination = max(0.01, min(0.15, float(np.mean(y_train))))
    iso_forest = IsolationForest(contamination=contamination, random_state=42)
    iso_forest.fit(X_train)

    # Evaluation
    y_pred = xgb_model.predict(X_test)
    y_prob = xgb_model.predict_proba(X_test)[:, 1]

    print("\n--- MODEL PERFORMANCE REPORT ---")
    print(classification_report(y_test, y_pred, digits=4, zero_division=0))
    if len(np.unique(y_test)) > 1:
        auc = roc_auc_score(y_test, y_prob)
        print(f"ROC-AUC Score: {auc:.4f}")

    # Save trained models
    xgb_path = os.path.join(MODEL_DIR, "xgb_model.json")
    iso_path = os.path.join(MODEL_DIR, "iso_forest.joblib")
    xgb_model.save_model(xgb_path)
    joblib.dump(iso_forest, iso_path)

    print(f"\n[OK] Trained models saved successfully to:\n  -> {xgb_path}\n  -> {iso_path}")

if __name__ == "__main__":
    args = parse_args()
    train(args.dataset)

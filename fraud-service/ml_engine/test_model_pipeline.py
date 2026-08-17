# test_model_pipeline.py
# Pytest suite for Fraud ML Detector pipeline

import pytest
from model_pipeline import detector

def test_pipeline_initialization():
    assert detector.is_trained is True
    assert detector.xgb_model is not None
    assert detector.iso_forest is not None

def test_prediction_output_format():
    # Evaluate sample transaction payload
    # amount, lat_diff, lon_diff, hour_of_day, device_risk
    result = detector.predict(
        amount=1200.0,
        lat_diff=0.7,
        lon_diff=0.8,
        hour_of_day=3.0,
        device_risk=0.9
    )

    assert "fraud_probability" in result
    assert "confidence_score" in result
    assert "risk_level" in result
    assert "reason" in result
    assert "model_name" in result
    assert "shap_explanation" in result
    assert "lime_explanation" in result

def test_risk_level_bounds():
    # 1. Low risk scenario
    low_risk_res = detector.predict(
        amount=10.0,
        lat_diff=0.0,
        lon_diff=0.0,
        hour_of_day=12.0,
        device_risk=0.1
    )
    assert low_risk_res["risk_level"] == "LOW"

    # 2. Critical risk scenario
    crit_risk_res = detector.predict(
        amount=5000.0,
        lat_diff=0.9,
        lon_diff=0.9,
        hour_of_day=2.0,
        device_risk=0.9
    )
    assert crit_risk_res["risk_level"] in ["HIGH", "CRITICAL"]

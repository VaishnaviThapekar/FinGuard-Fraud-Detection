# main.py
# FastAPI server for the ML Fraud Inference Engine

from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import Optional
from model_pipeline import detector

app = FastAPI(title="FinGuard AI ML Inference Engine", version="1.0.0")

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

class TransactionPayload(BaseModel):
    transactionId: str
    amount: float
    merchantCategory: Optional[str] = "unknown"
    senderAccountNumber: str
    receiverAccountNumber: str
    channel: Optional[str] = "ONLINE"
    ipAddress: Optional[str] = "127.0.0.1"
    deviceFingerprint: Optional[str] = "unknown"

@app.get("/health")
def health():
    return {"status": "UP", "model_loaded": detector.is_trained}

@app.post("/api/v1/ml/evaluate")
def evaluate(payload: TransactionPayload):
    try:
        amount = float(payload.amount)
        lat_diff = 0.8 if payload.merchantCategory in ["off-shore", "restricted"] else 0.1
        lon_diff = 0.8 if payload.merchantCategory in ["off-shore", "restricted"] else 0.1
        hour_of_day = 3.0 if payload.channel == "ONLINE" else 14.0
        device_risk = 0.9 if "linux" in payload.deviceFingerprint.lower() else 0.1

        result = detector.predict(amount, lat_diff, lon_diff, hour_of_day, device_risk)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference exception: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import os 
import httpx

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

from mocks.audit_log import get_audit_log
from mocks.alerts import get_alerts, acknowledge_alert, dismiss_alert


load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE_SERVICE_URL = os.getenv("DEVICE_SERVICE_URL")


@app.get("/devices")
async def list_devices():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{DEVICE_SERVICE_URL}/devices")
            return response.json()

        except httpx.ConnectError:
            raise HTTPException(
                status_code=503,
                detail="Device service unavailable"
            )


@app.get("/devices/{device_id}")
async def get_device(device_id: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{DEVICE_SERVICE_URL}/devices/{device_id}")

            if response.status_code == 404:
                raise HTTPException(
                    status_code=404,
                    detail="Device not found"
                ) 

            return response.json()

        except httpx.ConnectError:
            raise HTTPException(
                status_code=503,
                detail="Device service unavailable"
            )
        
        
@app.get("/audit-log")
async def list_audit_log():
    return get_audit_log()


@app.get("/alerts")
async def list_alerts():
    return get_alerts()


@app.post("/alerts/{alert_id}/acknowledge")
async def acknowledge_alert_route(alert_id: str):
    result = acknowledge_alert(alert_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    return result


@app.post("/alerts/{alert_id}/dismiss")
async def dismiss_alert_route(alert_id: str):
    result = dismiss_alert(alert_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    return result
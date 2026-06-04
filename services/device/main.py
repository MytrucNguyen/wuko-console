from fastapi import FastAPI, HTTPException
from data import DEVICES


app = FastAPI(title="Device Service") 

@app.get("/devices")
def list_devices():
    return DEVICES


@app.get("/devices/{device_id}")
def get_device(device_id: str):
    for device in DEVICES:
        if device.id == device_id:
            return device
        
    raise HTTPException(status_code=404, detail="Device not found")
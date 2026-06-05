import os 
import httpx
from fastapi import FastAPI
from dotenv import load_dotenv


load_dotenv()

app = FastAPI()

DEVICE_SERVICE_URL = os.getenv("DEVICE_SERVICE_URL")


@app.get("/devices")
async def list_devices():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DEVICE_SERVICE_URL}/devices")

        return response.json()

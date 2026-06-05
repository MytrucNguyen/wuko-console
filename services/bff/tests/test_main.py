import os
import pytest
import respx
from httpx import Response
from dotenv import load_dotenv

from fastapi.testclient import TestClient
from main import app


load_dotenv()

client = TestClient(app)
DEVICE_SERVICE_URL = os.getenv("DEVICE_SERVICE_URL")

@respx.mock
def test_list_devices_return_from_device_services():
    device_service_route = respx.get(f"{DEVICE_SERVICE_URL}/devices").mock(
        return_value=Response(
            200,
            json=[
                {
                    "id": "KIOSK-1",
                    "name": "Test Kiosk",
                    "region": "us-west",
                    "status": "healthy",
                    "firmware_version": "1.0.0",
                    "ip_address": "10.0.0.1",
                    "last_seen": "2026-06-04T12:00:00Z",
                    "store": "Test Store",
                }
            ],
        )
    )

    response = client.get("/devices")

    assert response.status_code == 200
    assert device_service_route.called
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "KIOSK-1"
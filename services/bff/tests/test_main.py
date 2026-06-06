import os
import pytest
import respx
from httpx import Response
import httpx
from dotenv import load_dotenv

from fastapi.testclient import TestClient
from main import app


load_dotenv()

client = TestClient(app)
DEVICE_SERVICE_URL = os.getenv("DEVICE_SERVICE_URL")

@respx.mock
def test_list_devices_returns_from_device_services():
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


@respx.mock
def test_list_devices_returns_503_when_device_service_unavailable():
    device_service_route = respx.get(f"{DEVICE_SERVICE_URL}/devices").mock(
        side_effect=httpx.ConnectError("Connection refused")
    )

    response = client.get("/devices")

    assert response.status_code == 503
    assert device_service_route.called
    assert response.json() == {"detail": "Device service unavailable"}


@respx.mock
def test_get_device_by_id_returns_device():
    device_service_route = respx.get(f"{DEVICE_SERVICE_URL}/devices/KIOSK-1").mock(
        return_value=Response(
            200,
            json={
                "id": "KIOSK-1",
                "name": "Test Kiosk",
                "region": "us-west",
                "status": "healthy",
                "firmware_version": "1.0.0",
                "ip_address": "10.0.0.1",
                "last_seen": "2026-06-04T12:00:00Z",
                "store": "Test Store",
            }
        )
    )

    response = client.get("/devices/KIOSK-1")

    assert response.status_code == 200
    assert device_service_route.called

    data = response.json()

    assert data["id"] == "KIOSK-1"
    assert data["region"] == "us-west"


@respx.mock
def test_get_device_by_id_returns_404_when_device_not_found():
    device_service_route = respx.get(f"{DEVICE_SERVICE_URL}/devices/KIOSK-DOES-NOT-EXIST").mock(
        return_value=Response(
            404,
            json={"detail": "Device not found"}
        )
    )

    response = client.get("/devices/KIOSK-DOES-NOT-EXIST")

    assert response.status_code == 404
    assert device_service_route.called
    assert response.json() == {"detail": "Device not found"}

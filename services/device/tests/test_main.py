from fastapi.testclient import TestClient
from main import app


client = TestClient(app)

def test_list_devices_return_all_devices():
    response = client.get("/devices")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 3
    assert data[0]["id"] == "KIOSK-4729"


def test_get_device_by_id_resturns_correct_device():
    response = client.get("/devices/KIOSK-3310")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "KIOSK-3310"
    assert data["region"] == "us-east"
    assert data["status"] == "updating"


def test_get_device_by_id_resturns_404_when_not_found():
    response = client.get("/devices/KIOSK-DOES-NOT-EXIST")
    
    assert response.status_code == 404
    assert response.json() == {"detail": "Device not found"}
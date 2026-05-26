from models import Device, DeviceStatus


DEVICES = [
    Device(
        id="KIOSK-4729",
        name="Front Counter Kiosk",
        region="us-west",
        status=DeviceStatus.HEALTHY,
        firmware_version="2.4.1",
        ip_address="10.0.4.22",
        last_seen="2026-05-25T14:30:00Z",
        store="Store #1182",
    ),
    Device(
        id="KIOSK-3310",
        name="Side Counter Kiosk",
        region="us-east",
        status=DeviceStatus.UPDATING,
        firmware_version="2.4.0",
        ip_address="11.1.4.22",
        last_seen="2026-05-24T14:30:00Z",
        store="Store #1180",
    ),
    Device(
        id="KIOSK-3300",
        name="Standalone Counter Kiosk",
        region="us-west",
        status=DeviceStatus.OFFLINE,
        firmware_version="2.4.1",
        ip_address="12.2.2.22",
        last_seen="2026-05-23T22:30:00Z",
        store="Store #1000",
    ),
]
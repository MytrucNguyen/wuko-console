from datetime import datetime, timedelta, timezone


def get_audit_log():
    """Return mock audit log events with timestamps relative to now."""
    now = datetime.now(timezone.utc)

    return [
        {
            "id": "evt_001",
            "timestamp": (now - timedelta(minutes=12)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "device.restart",
            "target": "KIOSK-4729",
            "region": "us-west",
            "outcome": "success",
        },
        {
            "id": "evt_002",
            "timestamp": (now - timedelta(hours=1)).isoformat(),
            "actor": "operator@wuko.dev",
            "action": "firmware.update",
            "target": "KIOSK-3310",
            "region": "us-east",
            "outcome": "success",
        },
        {
            "id": "evt_003",
            "timestamp": (now - timedelta(hours=3)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "device.restart",
            "target": "KIOSK-3300",
            "region": "us-west",
            "outcome": "failed",
        },
        {
            "id": "evt_004",
            "timestamp": (now - timedelta(hours=6)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "policy.update",
            "target": "alert-thresholds",
            "region": "all",
            "outcome": "success",
        },
        {
            "id": "evt_005",
            "timestamp": (now - timedelta(hours=18)).isoformat(),
            "actor": "operator@wuko.dev",
            "action": "alert.acknowledge",
            "target": "alert_4729_overheat",
            "region": "us-west",
            "outcome": "success",
        },
        {
            "id": "evt_006",
            "timestamp": (now - timedelta(days=1)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "firmware.update",
            "target": "KIOSK-2150",
            "region": "eu-north",
            "outcome": "success",
        },
        {
            "id": "evt_007",
            "timestamp": (now - timedelta(days=2)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "device.restart",
            "target": "KIOSK-2199",
            "region": "eu-north",
            "outcome": "success",
        },
        {
            "id": "evt_008",
            "timestamp": (now - timedelta(days=3)).isoformat(),
            "actor": "admin@wuko.dev",
            "action": "user.role.change",
            "target": "operator@wuko.dev",
            "region": "all",
            "outcome": "success",
        },
    ]
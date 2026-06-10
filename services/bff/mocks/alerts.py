from datetime import datetime, timedelta, timezone


_alerts_state = None


def _build_initial_alerts():
    """Construct the initial alert list. Called once on first access."""
    now = datetime.now(timezone.utc)

    return [
        {
            "id": "alt_001",
            "severity": "critical",
            "title": "Device offline",
            "device_id": "KIOSK-3300",
            "region": "us-west",
            "created_at": (now - timedelta(minutes=4)).isoformat(),
            "status": "active",
        },
        {
            "id": "alt_002",
            "severity": "warning",
            "title": "Firmware update available",
            "device_id": "KIOSK-3310",
            "region": "us-east",
            "created_at": (now - timedelta(minutes=22)).isoformat(),
            "status": "active",
        },
        {
            "id": "alt_003",
            "severity": "critical",
            "title": "Temperature threshold exceeded",
            "device_id": "KIOSK-4729",
            "region": "us-west",
            "created_at": (now - timedelta(hours=1, minutes=15)).isoformat(),
            "status": "active",
        },
        {
            "id": "alt_004",
            "severity": "info",
            "title": "Daily health check completed",
            "device_id": "KIOSK-2150",
            "region": "eu-north",
            "created_at": (now - timedelta(hours=2)).isoformat(),
            "status": "active",
        },
        {
            "id": "alt_005",
            "severity": "warning",
            "title": "Network latency elevated",
            "device_id": "KIOSK-2199",
            "region": "eu-north",
            "created_at": (now - timedelta(hours=3, minutes=40)).isoformat(),
            "status": "active",
        },
        {
            "id": "alt_006",
            "severity": "info",
            "title": "Firmware update completed",
            "device_id": "KIOSK-3310",
            "region": "us-east",
            "created_at": (now - timedelta(hours=8)).isoformat(),
            "status": "acknowledged",
        },
        {
            "id": "alt_007",
            "severity": "critical",
            "title": "Disk space critical",
            "device_id": "KIOSK-4729",
            "region": "us-west",
            "created_at": (now - timedelta(hours=14)).isoformat(),
            "status": "acknowledged",
        },
    ]


def get_alerts():
    """Return the current list of alerts."""
    global _alerts_state
    if _alerts_state is None:
        _alerts_state = _build_initial_alerts()
    return _alerts_state


def acknowledge_alert(alert_id: str) -> dict | None:
    """Mark an alert as acknowledged. Returns the updated alert or None if not found."""
    alerts = get_alerts()
    for alert in alerts:
        if alert["id"] == alert_id:
            alert["status"] = "acknowledged"
            return alert
    return None


def dismiss_alert(alert_id: str) -> dict | None:
    """Mark an alert as dismissed. Returns the updated alert or None if not found."""
    alerts = get_alerts()
    for alert in alerts:
        if alert["id"] == alert_id:
            alert["status"] = "dismissed"
            return alert
    return None
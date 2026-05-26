from enum import Enum
from pydantic import BaseModel


class DeviceStatus(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    OFFLINE = "offline"
    UPDATING = "updating"


class Device(BaseModel):
    id: str
    name: str
    region: str
    status: DeviceStatus
    firmware_version: str
    ip_address: str
    last_seen: str
    store: str


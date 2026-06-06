# BFF (Backend for Frontend)

The aggregation layer between the Wuko Console web frontend and the internal microservices. The web client talks only to the BFF; the BFF coordinates with downstream services on its behalf.

## Responsibilities

- Forward requests from the web client to internal services
- Aggregate data across multiple downstream services (future)
- Handle partial failures gracefully (returns 503 when a downstream is unreachable)
- Propagate downstream error statuses (e.g. 404) to the client

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/devices` | Returns all devices from the device service |
| GET | `/devices/{device_id}` | Returns a single device by ID, or 404 if not found |

## Architecture

    web client
        |
        v
    BFF (this service, :8001)
        |
        v
    device service (:8000)

The BFF never owns data. All data lives in downstream services. The BFF only knows how to reach them and how to handle their failures.

## Running locally

Requires the device service to be running on `http://localhost:8000`.

    cd services/bff
    source .venv/bin/activate
    uvicorn main:app --reload --port 8001

The BFF will be available at `http://localhost:8001`. Interactive API docs at `http://localhost:8001/docs`.

## Configuration

Environment variables (via `.env`):

| Variable | Description |
|---|---|
| `DEVICE_SERVICE_URL` | Base URL of the device service (e.g. `http://localhost:8000`) |

See `.env.example` for the expected shape.

## Testing

    pytest

Tests use `respx` to mock outbound HTTP calls, so the device service does not need to be running.

## Failure handling

| Scenario | Response |
|---|---|
| Downstream returns 200 | BFF returns the data as-is |
| Downstream returns 404 | BFF returns 404 with `{"detail": "Device not found"}` |
| Downstream is unreachable | BFF returns 503 with `{"detail": "Device service unavailable"}` |
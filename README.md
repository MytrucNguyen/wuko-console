# Wuko Console

A multi-persona internal operations dashboard for managing a fleet of retail kiosks. Built on top of the [Wuko component library](https://wuko.dev). Demonstrates Backend-for-Frontend architecture, role-based access control, and graceful handling of partial service failures across multiple internal services.

**Status:** In active development.

## Personas

- **Admin** - All regions. Can restart and update devices, view the audit log, manage policies.
- **Operator** - Assigned region only. Can restart and update devices, acknowledge alerts.
- **Viewer** - Assigned region only. Read-only.

## Architecture

    [Client (web/)]
           |
           v
    [BFF (services/bff/)]     <- The only service the frontend talks to
           |
           +--> [services/device/]      Device registry and status
           +--> [services/telemetry/]   Time-series CPU/memory data
           +--> [services/audit/]       Append-only action log

An API Gateway would sit in front of the BFF in production (auth, rate limiting, TLS termination) - out of scope for this demo. Likely candidates: AWS API Gateway, Kong, Envoy.

### Folder layout

- **`web/`** - Next.js 15 + TypeScript frontend. Consumes `@wuko/ui` from [wuko.dev](https://wuko.dev).
- **`services/bff/`** - FastAPI Backend-for-Frontend. Aggregates downstream data, enforces RBAC, handles partial failures, owns request correlation.
- **`services/device/`** - FastAPI. Owns the device registry and status.
- **`services/telemetry/`** - FastAPI. Owns time-series telemetry data.
- **`services/audit/`** - FastAPI. Owns the append-only audit log.

## Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Frontend | Next.js 15, TypeScript, Tailwind CSS, @wuko/ui, React Query |
| Backend  | FastAPI, Pydantic, httpx, structlog, python-jose (JWT)      |
| Testing  | pytest, Playwright                                          |
| Tooling  | Docker Compose, GitHub Actions                              |

## What this demonstrates

- Multi-persona UI with role-based access control enforced on both the client and the BFF
- Backend-for-Frontend pattern aggregating data from multiple internal services
- Graceful degradation when downstream services are unavailable
- Structured logging with request correlation across all four backend services
- A component library (Wuko) consumed as a versioned dependency in a real application

## Running locally

Coming soon - currently scaffolding services.

---

Built by [Mytruc Nguyen](https://mytrucnguyen.dev).

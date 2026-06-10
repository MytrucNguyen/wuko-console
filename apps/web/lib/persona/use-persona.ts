"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

export type PersonaId = "admin" | "operator" | "viewer";

export type PersonaConfig = {
  id: PersonaId;
  label: string;
  permissions: {
    canRestartDevice: boolean;
    canUpdateFirmware: boolean;
    canViewAuditLog: boolean;
    canManagePolicies: boolean;
    canViewSettings: boolean;
    canViewAlerts: boolean;
  };
};

const PERSONA_CONFIG: Record<PersonaId, PersonaConfig> = {
  admin: {
    id: "admin",
    label: "Admin",
    permissions: {
      canRestartDevice: true,
      canUpdateFirmware: true,
      canViewAuditLog: true,
      canManagePolicies: true,
      canViewSettings: true,
      canViewAlerts: true,
    },
  },
  operator: {
    id: "operator",
    label: "Operator",
    permissions: {
      canRestartDevice: true,
      canUpdateFirmware: true,
      canViewAuditLog: false,
      canManagePolicies: false,
      canViewSettings: false,
      canViewAlerts: true,
    },
  },
  viewer: {
    id: "viewer",
    label: "Viewer",
    permissions: {
      canRestartDevice: false,
      canUpdateFirmware: false,
      canViewAuditLog: false,
      canManagePolicies: false,
      canViewSettings: false,
      canViewAlerts: false,
    },
  },
};

const STORAGE_KEY = "wuko-console:persona";

function isPersonaId(value: string | null): value is PersonaId {
  return value === "admin" || value === "operator" || value === "viewer";
}

export function usePersona(): PersonaConfig {
  const searchParams = useSearchParams();
  const urlPersona = searchParams.get("persona");

  const [storedPersona, setStoredPersona] = React.useState<PersonaId | null>(
    null,
  );

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isPersonaId(stored)) {
      setStoredPersona(stored);
    }
  }, []);

  React.useEffect(() => {
    if (isPersonaId(urlPersona)) {
      localStorage.setItem(STORAGE_KEY, urlPersona);
      setStoredPersona(urlPersona);
    }
  }, [urlPersona]);

  const personaId: PersonaId = isPersonaId(urlPersona)
    ? urlPersona
    : storedPersona ?? "viewer";

  return PERSONA_CONFIG[personaId];
}
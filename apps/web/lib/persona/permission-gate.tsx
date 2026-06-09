"use client";

import * as React from "react";
import { usePersona, type PersonaConfig } from "./use-persona";

type PermissionGateProps = {
  require: keyof PersonaConfig["permissions"];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function PermissionGate({
  require,
  children,
  fallback = null,
}: PermissionGateProps) {
  const persona = usePersona();
  const allowed = persona.permissions[require];

  return <>{allowed ? children : fallback}</>;
}

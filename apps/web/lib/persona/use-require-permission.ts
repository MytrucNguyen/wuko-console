"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { usePersona, type PersonaConfig } from "./use-persona";

export function useRequirePermission(
  permission: keyof PersonaConfig["permissions"],
  redirectTo: string = "/fleet",
) {
  const router = useRouter();
  const persona = usePersona();
  const allowed = persona.permissions[permission];

  React.useEffect(() => {
    if (!allowed) {
      router.replace(redirectTo);
    }
  }, [allowed, redirectTo, router]);

  return allowed;
}
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { useIsHydrated } from "./use-is-hydrated";
import { usePersona, type PersonaConfig } from "./use-persona";

export function useRequirePermission(
  permission: keyof PersonaConfig["permissions"],
  redirectTo: string = "/fleet",
) {
  const router = useRouter();
  const persona = usePersona();
  const isHydrated = useIsHydrated();
  const allowed = persona.permissions[permission];

  React.useEffect(() => {
    if (isHydrated && !allowed) {
      router.replace(redirectTo);
    }
  }, [isHydrated, allowed, redirectTo, router]);

  return allowed;
}
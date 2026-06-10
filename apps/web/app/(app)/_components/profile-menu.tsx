"use client";

import { Check, ChevronDown, LogOut } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePersona, type PersonaId } from "@/lib/persona/use-persona";
import { Avatar } from "@/components/ui/avatar";

const PERSONA_OPTIONS: { id: PersonaId; label: string }[] = [
  { id: "admin", label: "Admin" },
  { id: "operator", label: "Operator" },
  { id: "viewer", label: "Viewer" },
];

export function ProfileMenu() {
  const persona = usePersona();
  const router = useRouter();
  const searchParams = useSearchParams();

  function switchPersona(newPersonaId: PersonaId) {
    const params = new URLSearchParams(searchParams);
    params.set("persona", newPersonaId);
    router.push(`?${params.toString()}`);
  }

  function signOut() {
    localStorage.removeItem("wuko-console:persona");
    router.push("/");
  }

  const initial = persona.label.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 rounded-full! border border-wuko-border px-1 py-4.5"
        >
          <Avatar size="sm" fallback={initial} />
          <span className="text-sm">{persona.label}</span>
          <ChevronDown className="size-3.5 text-wuko-text-muted transition-transform data-[state=open]:rotate-180" />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-wider text-wuko-text-muted">
          Switch persona (demo)
        </DropdownMenuLabel>
        {PERSONA_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => switchPersona(option.id)}
            className="flex items-center justify-between"
          >
            <span>{option.label}</span>
            {persona.id === option.id && (
              <Check className="size-4 text-wuko-accent" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

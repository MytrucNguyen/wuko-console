import { ArrowRight } from "lucide-react";
import Mascot from "@/components/brand/mascot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PERSONAS } from "../_data/personas";

export function Login() {
  return (
    <main className="grid-bg flex min-h-screen items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        {/* Header: mascot, brand line, h1, subhead */}
        <div className="flex flex-col items-center gap-2">
          <Mascot />
          <p className="text-sm font-medium text-wuko-text-muted">
            Wuko Console
          </p>
          <h1 className="text-2xl font-semibold text-wuko-heading">
            Choose how to sign in
          </h1>
          <p className="text-sm text-wuko-text-muted">
            Each persona shows the same data through a different permissions
            lens.
          </p>
        </div>

        {/* Card with three persona rows */}
        <Card className="w-full flex flex-col gap-3 p-3">
          {PERSONAS.map((persona) => {
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                className="flex w-full items-center gap-4 rounded-md border border-wuko-border bg-wuko-bg/30 p-4 text-left transition-colors hover:bg-wuko-bg/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-wuko-accent/15 text-wuko-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-wuko-heading">
                      Continue as {persona.name}
                    </span>
                    {persona.badge && (
                      <Badge variant="teal">{persona.badge}</Badge>
                    )}
                  </div>
                  <span className="text-xs text-wuko-text-muted">
                    {persona.description}
                  </span>
                </div>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-wuko-text-muted"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </Card>

        {/* Demo mode warning */}
        <Badge variant="warning">● Demo mode · no real authentication</Badge>

        {/* Version footer */}
        <p className="font-mono text-xs text-wuko-text-muted">v4.13.0</p>
      </div>
    </main>
  );
}

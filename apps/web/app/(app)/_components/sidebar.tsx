"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { usePersona } from "@/lib/persona/use-persona";

import { NAV_ITEMS, type NavItem } from "../_data/nav-items";

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors ${
        isActive
          ? "border-wuko-accent/30 bg-wuko-accent/10 text-wuko-heading"
          : "border-transparent text-wuko-text hover:bg-wuko-card/40 hover:text-wuko-heading"
      }`}
    >
      <Icon
        className={`size-4 ${
          isActive ? "text-wuko-accent" : "text-wuko-text-muted"
        }`}
      />
      <span className="flex-1">{item.label}</span>
      {item.badge !== undefined && (
        <span className="rounded-full bg-wuko-card px-2 py-0.5 text-xs text-wuko-text-muted">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const persona = usePersona();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (!item.requiresPermission) return true;
    return persona.permissions[item.requiresPermission];
  });

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-wuko-border bg-wuko-bg p-3">
      <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-wuko-text-muted">
        Workspace
      </div>
      <nav className="flex flex-col gap-1">
        {visibleItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

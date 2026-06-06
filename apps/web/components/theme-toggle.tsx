"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
      aria-label="Toggle theme"
      size={"md"}
    >
        <Sun size={18} aria-hidden className="hidden dark:inline" />
        <Moon size={18} aria-hidden className="dark:hidden" />
    </Button>
  );
}

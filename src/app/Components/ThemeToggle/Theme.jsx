import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToggleTheme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const activeTheme = resolvedTheme || theme;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="rounded-full border border-slate-300 px-3 py-1 transition hover:border-violet-500 dark:border-slate-600 dark:hover:border-pink-400"
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {activeTheme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};

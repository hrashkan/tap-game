import { useEffect } from "react";
import { useGameStore } from "../store/game";
import type { GameTheme } from "../store/game";

const themeLabels: Record<GameTheme, string> = {
  classic: "Classic",
  coin: "Coin",
  cat: "Cat",
};

export function ThemeToggle() {
  const theme = useGameStore((s) => s.theme);
  const setTheme = useGameStore((s) => s.setTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const cycle = () => {
    const order: GameTheme[] = ["classic", "coin", "cat"];
    const idx = order.indexOf(theme);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  };

  return (
    <button className="theme-toggle" onClick={cycle} aria-label="Toggle theme">
      {themeLabels[theme]}
    </button>
  );
}
